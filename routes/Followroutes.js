import express from 'express'
import FollowOperations from '../controller/Follow.js'
import authenticateToken from '../middleware/middleware.js'
const router = express.Router()

router.post('/request', authenticateToken,FollowOperations.FollowRequest)
router.put('/acceptrequest',authenticateToken, FollowOperations.acceptRequest)
router.put('/rejectrequest',authenticateToken, FollowOperations.rejectRequest)
router.get('/followingpost',authenticateToken, FollowOperations.getfollowingPost)
router.get('/followingstories',authenticateToken, FollowOperations.getFollowingStories)
export default router
