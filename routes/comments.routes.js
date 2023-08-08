import {Router} from 'express'

import CommentOperations from '../controller/comments.controller.js'
import verifyToken from '../middleware/verifyToken.js'
import {commentsDeleteUpdateAuth } from '../middleware/commentAuth.js'
import { userAuth } from '../middleware/userAuth.js'

const router = Router()

router.post('/',verifyToken,userAuth,CommentOperations.addComment)
router.get('/',verifyToken,CommentOperations.getComment)
router.delete('/',verifyToken,commentsDeleteUpdateAuth,CommentOperations.deleteComment)
router.put('/',verifyToken,commentsDeleteUpdateAuth,CommentOperations.updateComment)
export default router
