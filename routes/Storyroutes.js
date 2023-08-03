import express from 'express'
import multer from 'multer'
import authenticateToken from '../middleware/middleware.js'
import storyOperations from '../controller/Story.js'
const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/home/dev/Desktop/Test Project/server/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})


const upload = multer({ storage })
router.post('/add', upload.single('image'), storyOperations.addStory)
router.delete('/delete',storyOperations.deleteStoryItems)
export default router