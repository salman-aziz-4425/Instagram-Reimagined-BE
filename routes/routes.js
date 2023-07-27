import express from 'express'
import UserOperations from '../controller/User.js'
const router = express.Router()

router.post('/registerUser', UserOperations.Registeration)
router.get('/loginUser', UserOperations.Login)
export default router
