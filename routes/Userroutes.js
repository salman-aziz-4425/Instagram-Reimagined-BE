import express from 'express'
import multer from 'multer'
import UserOperations from '../controller/User.js'
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

router.post('/registerUser', UserOperations.Registeration)
router.get('/loginUser', UserOperations.Login)
router.get('/searchUser', UserOperations.searchUser)
router.put(
	'/updateProfile',
	upload.single('image'),
	UserOperations.updateProfilePic
)
router.put('/updateVisibility', UserOperations.updatePageVisibility)
export default router
