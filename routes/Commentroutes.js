import express from 'express'
import CommentOperations from '../controller/Comment.js'

const router = express.Router()

router.post('/add', CommentOperations.addComment)
router.get('/get', CommentOperations.getComment)
router.delete('/delete', CommentOperations.deleteComment)
router.put('/update', CommentOperations.updateComment)
export default router
