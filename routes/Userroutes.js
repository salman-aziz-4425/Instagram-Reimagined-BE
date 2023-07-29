import express from 'express'
import multer from 'multer'
import UserOperations from '../controller/User.js'
import authenticateToken from '../middleware/middleware.js'

const router = express.Router()
const storage = multer.memoryStorage();
const upload = multer({ storage })

router.post('/register', UserOperations.Registeration)
router.get('/login', UserOperations.Login)
router.get('/search',authenticateToken , UserOperations.searchUser)
router.put(
	'/update',
	authenticateToken,
	upload.array('images',1),
	UserOperations.updateProfilePic
)
router.put('/updatevisibility',authenticateToken , UserOperations.updatePageVisibility)
export default router
