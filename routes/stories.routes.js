import {Router} from 'express'

import uploadImage from '../middleware/uploadImage.js'
import StoryOperations from '../controller/stories.controller.js'
import verifyToken from '../middleware/verifyToken.js'
import { userAuth } from '../middleware/userAuth.js'

const router = Router()


router.post('/', uploadImage(1),verifyToken, userAuth, StoryOperations.addStory)
router.delete('/',verifyToken, userAuth,StoryOperations.deleteStoryItems)
export default router