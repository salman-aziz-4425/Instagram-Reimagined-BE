import express from 'express'
import multer from 'multer'
import storyOperations from '../controller/Story.js'

const router = express.Router()
const storage = multer.memoryStorage();
const upload = multer({ storage })

router.post('/add', upload.array('images',1), storyOperations.addStory)
router.delete('/delete',storyOperations.deleteStoryItems)
export default router