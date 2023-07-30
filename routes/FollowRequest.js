import express from 'express'
import FollowOperations from '../controller/Follow.js'

const router = express.Router()

router.post('/followRequest', FollowOperations.FollowRequest)
router.put('/acceptRequest', FollowOperations.acceptRequest)
router.put('/rejectRequest', FollowOperations.rejectRequest)
router.get('/getfollowingPost', FollowOperations.getfollowingPost)
export default router
