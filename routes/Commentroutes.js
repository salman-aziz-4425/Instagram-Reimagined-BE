import express from 'express'
import CommentOperations from '../controller/Comment.js'

const router = express.Router()

router.post('/addComments', CommentOperations.addComment)
router.get('/getcomments', CommentOperations.getComment)
router.delete('/deleteComment', CommentOperations.deleteComment)
router.put('/updateComment', CommentOperations.updateComment)
export default router
