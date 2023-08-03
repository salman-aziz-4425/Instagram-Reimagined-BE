import express from 'express'
import multer from 'multer'
import authenticateToken from '../middleware/middleware.js'
import PostOperations from '../controller/Post.js'
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

router.post('/add',authenticateToken, upload.array('images', 5), PostOperations.addPost)
router.post('/like', PostOperations.likepost)
router.get('/get', authenticateToken, PostOperations.getPost)
router.get('/specificpost', PostOperations.getSpecificPostData)
router.delete('/delete', PostOperations.deletePost)
router.put('/update', upload.array('images', 5), PostOperations.updatePost)
router.put('/updatevisibility', PostOperations.updatePostVisibility)
export default router
