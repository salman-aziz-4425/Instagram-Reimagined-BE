// eslint-disable-next-line no-unused-vars
import { dataBaseConnection } from './db/mongoose.js'
import Userrouter from './routes/Userroutes.js'
import Postroutes from './routes/Postroutes.js'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(Userrouter)
app.use(Postroutes)
app.use('/uploads', express.static('uploads'))

// eslint-disable-next-line no-undef
app.listen(process.env.PORT || 3001, () => {
	console.log('server connected')
})
