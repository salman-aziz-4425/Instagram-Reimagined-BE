import StoryService from '../services/stories.services.js'

const storyOperations = {
    addStory: async (req, res) => {
        const { userId, description } = req.body;
        try {
            const storyId = await StoryService.addStory(userId, description, req.files);
            res.status(200).json({
                message: 'Story inserted/updated',
                id: storyId,
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getStory: async (req, res) => {
        const { storyId } = req.query;
        try {
            const story = await StoryService.getStoryById(storyId);
            res.status(200).json({ story });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    deleteStoryItems: async (req, res) => {
        const { storyId, index, userId } = req.query;
        try {
            await StoryService.deleteStoryItem(storyId, index, userId,req.user.userId);
            res.status(200).json({ message: 'Story deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


}

export default storyOperations