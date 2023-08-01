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
router.post('/addPost', upload.array('images', 5), PostOperations.addPost)
router.post('/likePost', PostOperations.likepost)
router.get('/getPost', authenticateToken, PostOperations.getPost)
router.get('/specificPostData', PostOperations.getSpecificPostData)
router.delete('/deletePost', PostOperations.deletePost)
router.put('/updatePost', upload.array('images', 5), PostOperations.updatePost)
router.put('/updatePostVisibility', PostOperations.updatePostVisibility)
export default router
