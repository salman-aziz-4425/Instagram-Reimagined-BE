import User from '../Model/User.js';
import Story from "../Model/Story.js";
import uploadFilesToCloudinary from '../cloudinary/utils/uploadfile.js';

const StoryService = {
  addStory: async (userId, description, files) => {

    let user = await User.findOne({ _id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    let story = await Story.findOne({ userId });
    const cloudinaryUrl = await uploadFilesToCloudinary(files);
    if (story) {
      story.descriptions.push(description);
      story.imageUrls.push(cloudinaryUrl[0]);
      story.expiryData.push(Date.now() + 24 * 60 * 60 * 1000);
    } else {
      story = await Story.create({
        userId: userId,
        descriptions: [description],
        imageUrls: [cloudinaryUrl[0]],
        expiryData: [Date.now() + 24 * 60 * 60 * 1000],
      });
      user.stories.push(story._id);
    }
    await Promise.all([user.save(),story.save()])
    return story._id;

  },

  getStoryById: async (storyId) => {

    const story = await Story.findOne({ _id: storyId });

    if (!story) {
      throw new Error('Story not found');
    }

    return story;

  },

  deleteStoryItem: async (storyId, index, userId, activeUserID) => {

    const story = await Story.findOne({ _id: storyId });
    if (!story) {
      throw new Error('Story not found');
    }
    else if (story.userId.toString() !== activeUserID.toString()) {
      throw new Error('User not allowed');
    }

    if (index >= 0 && index < story.descriptions.length && index < story.imageUrls.length) {
      story.descriptions.splice(index, 1);
      story.imageUrls.splice(index, 1);
      story.expiryData.splice(index, 1);
    } else {
      throw new Error('Invalid index provided');
    }

    if (story.descriptions.length === 0) {
      await Promise.all(
        [
          story.deleteOne({ _id: storyId }),
          User.updateOne({ _id: userId }, { $pull: { stories: storyId } })
        ]
      )
      
    } else {
      await story.save();
    }
  },
  deleteExpiredStories: async () => {

    const currentTime = new Date()

    const storyIdsToDelete = await Story.aggregate([
      {
        $unwind: '$expiryData'
      },
      {
        $group: {
          _id: '$_id',
          maxExpiryDate: { $max: '$expiryData' }
        }
      },
      {
        $match: {
          maxExpiryDate: { $lt: currentTime }
        }
      },
      {
        $project: {
          _id: 1
        }
      }
    ]);    

    if (storyIdsToDelete.length > 0) {
      await Promise.all([
        User.updateMany(
          { stories: { $in: storyIdsToDelete } },
          { $pull: { stories: { $in: storyIdsToDelete } } }
        ),
        Story.deleteMany({ _id: { $in: storyIdsToDelete } })
      ]);

    }
  }
};

export default StoryService;
