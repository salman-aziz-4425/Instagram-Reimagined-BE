import User from '../Model/User.js';
import Story from "../Model/Story.js";
import uploadFilesToCloudinary from '../cloudinary/utils/uploadfile.js';

const StoryService = {
    addStory: async (userId, description, files) => {
        try {
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
            await user.save();
            await story.save();
            return story._id;
        } catch (error) {
            throw error;
        }
    },

    getStoryById: async (storyId) => {
        try {
            const story = await Story.findOne({ _id: storyId });

            if (!story) {
                throw new Error('Story not found');
            }

            return story;
        } catch (error) {
            throw error;
        }
    },

    deleteStoryItem: async (storyId, index, userId) => {
        try {
            const story = await Story.findOne({ _id: storyId });
            if (!story) {
                throw new Error('Story not found');
            }

            if (index >= 0 && index < story.descriptions.length && index < story.imageUrls.length) {
                story.descriptions.splice(index, 1);
                story.imageUrls.splice(index, 1);
                story.expiryData.splice(index, 1);
            } else {
                throw new Error('Invalid index provided');
            }

            if (story.descriptions.length === 0) {
                await story.deleteOne({ _id: storyId });
                await User.updateOne({ _id: userId }, { $pull: { stories: storyId } });
            } else {
                await story.save();
            }

        } catch (error) {
            throw error;
        }
    }
};

export default StoryService;
