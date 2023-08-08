import {Router} from 'express'

import FollowersController from '../controller/followers.controller.js'
import verifyToken from '../middleware/verifyToken.js'
import { userAuth } from '../middleware/userAuth.js';

const router = Router()

router.post('/requests', verifyToken,userAuth, FollowersController.followRequest);
router.get('/v1/:userId', verifyToken,userAuth, FollowersController.getFollowingPosts);
router.get('/v2/:id', verifyToken,userAuth, FollowersController.getFollowingStories);
router.get('/', verifyToken, FollowersController.getFollowers);
router.put('/requests/accept', verifyToken, userAuth, FollowersController.acceptRequest);
router.put('/requests/reject', verifyToken, userAuth, FollowersController.rejectRequest);


export default router








