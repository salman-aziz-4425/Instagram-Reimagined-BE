import cron from 'node-cron'

import StoryService from '../services/stories.services.js'

export default cron.schedule('*/2 * * * *', async () => {
  try {
      await StoryService.deleteExpiredStories()
    } catch (error) {
      console.error('Error deleting expired stories:', error);
    }
  
});