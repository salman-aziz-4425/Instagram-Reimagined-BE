import mongoose from 'mongoose'
import fs from 'fs'
import User from '../Model/User.js';
import Story from "../Model/Story.js";

const storyOperations = {
    addStory: async (req, res) => {
        const { userId, description } = req.body;
        const arrayUrl ='http://localhost:3000/uploads/'+req.file.filename;
    
        try {
          let user = await User.findOne({ _id: userId });
          if (!user) {
            throw new Error('User not found');
          }
    
          let story = await Story.findOne({ userId });
    
          if (story) {
            story.descriptions.push(description);
            story.imageUrls.push(arrayUrl);
            story.expiryData.push(Date.now() + 24 * 60 * 60 * 1000)
          } else {
            story = await Story.create({
              userId: userId,
              descriptions: [description],
              imageUrls: [arrayUrl],
              expiryData:[Date.now() + 24 * 60 * 60 * 1000],
            });
            user.stories.push(story._id);
          }
    
          await user.save();
          await story.save()
          res.status(200).send({
            message: 'Story inserted/updated',
            id: story._id,
          });
        } catch (error) {
          req.files.map((img) => fs.unlinkSync(img.path));
          res.status(500).send(error.message);
        }
      },
    getStory: async (req, res) => {
        const { storyId } = req.query
        try {
            const story = await Story.findOne({ _id: storyId });

            if (!story) {
                return res.status(404).send({ message: 'Story not found' });
            }

            res.status(200).send({ story });
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    deleteStoryItems:async (req,res) => {
        const { storyId, index ,userId} = req.query;
        try {
          const story = await Story.findOne({ _id: storyId });
          if (!story) {
            return res.status(404).send({ message: 'Story not found' });
          }
      
          if (index >= 0 && index < story.descriptions.length && index < story.imageUrls.length) {
            story.descriptions.splice(index, 1);
            story.imageUrls.splice(index, 1);
            story.expiryData.splice(index,1)
          } else {
            return res.status(400).send({ message: 'Invalid index provided' });
          }

          if(story.descriptions.length===0)
          {
            await story.deleteOne({_id:storyId})
            await User.updateOne({ _id: userId }, { $pull: { stories: storyId } });
          }
          else{
            await story.save();
          }
          
          res.status(200).send({
            message: 'Story deleted successfully',
          });
        } catch (error) {
          res.status(500).send(error);
        }
    }


}

export default storyOperations