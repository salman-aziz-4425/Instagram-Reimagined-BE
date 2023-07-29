import express from "express";
import { dataBaseConnection } from "./db/mongoose.js";
import { dataBaseConnection } from './db/mongoose.js'
import Userrouter from './routes/Userroutes.js'
import Postroutes from './routes/Postroutes.js'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())
app.use(Userrouter)
app.use(Postroutes)
app.use('/uploads', express.static('uploads'))

app.listen(3000, () => {
  console.log("server connected");
});
