import { Router } from 'express'

import verifyToken from '../middleware/verifyToken.js'
import uploadImage from '../middleware/uploadImage.js'
import PostOperations from '../controller/posts.controller.js'
import {postsOwnerAuth} from '../middleware/postAuth.js'
import { userAuth } from '../middleware/userAuth.js'

const router = Router()


router.post('/',uploadImage(10),verifyToken,userAuth, PostOperations.addPost)
router.post('/likes',verifyToken,userAuth, PostOperations.likePost)
router.get('/', verifyToken, PostOperations.getPost)
router.get('/:userId',verifyToken,PostOperations.getSpecificPostData)
router.delete('/',verifyToken,postsOwnerAuth, PostOperations.deletePost)
router.put('/v1',verifyToken,postsOwnerAuth,PostOperations.updatePost)
router.put('/v2',verifyToken,postsOwnerAuth, PostOperations.updatePostVisibility)
export default router
