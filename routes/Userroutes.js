import express from 'express'
import multer from 'multer'
import UserOperations from '../controller/User.js'
import authenticateToken from '../middleware/middleware.js'
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

router.post('/register', UserOperations.Registeration)
router.get('/login', UserOperations.Login)
router.get('/search',authenticateToken , UserOperations.searchUser)
router.put(
	'/update',
	authenticateToken,
	upload.single('image'),
	UserOperations.updateProfilePic
)
router.put('/updatevisibility',authenticateToken , UserOperations.updatePageVisibility)
export default router
