// eslint-disable-next-line no-unused-vars
import { dataBaseConnection } from './db/mongoose.js'
import router from './routes/routes.js'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)

// eslint-disable-next-line no-undef
app.listen(process.env.PORT || 3001, () => {
	console.log('server connected')
})
