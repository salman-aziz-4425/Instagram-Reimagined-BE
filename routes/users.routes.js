import {Router} from 'express'

import uploadImage from '../middleware/uploadImage.js'
import UserOperations from '../controller/users.controller.js'
import verifyToken from '../middleware/verifyToken.js'
import { userAuth } from '../middleware/userAuth.js'

const router = Router()

router.post('/', UserOperations.registration)
router.get('/', UserOperations.login)
router.get('/:searchTerm',verifyToken , UserOperations.searchUser)
router.put(
	'/v1',
	uploadImage(1),
	verifyToken,
	userAuth,
	UserOperations.updateProfilePic
)
router.put('/v2/visibility',verifyToken,userAuth , UserOperations.updatePageVisibility)
export default router
