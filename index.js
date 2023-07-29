import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
// eslint-disable-next-line no-unused-vars
import { dataBaseConnection } from './db/mongoose.js'
import Userrouter from './routes/Userroutes.js'
import Postroutes from './routes/Postroutes.js'
import Followroutes from './routes/Followroutes.js'
import Commentroutes from './routes/Commentroutes.js'
import StoryRoutes from './routes/Storyroutes.js'
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/user',Userrouter)
app.use('/post',Postroutes)
app.use('/follow',Followroutes)
app.use('/comment',Commentroutes)
app.use('/story',StoryRoutes)

// eslint-disable-next-line no-undef
app.listen(process.env.PORT || 3001, () => {
	console.log('server connected')
})
