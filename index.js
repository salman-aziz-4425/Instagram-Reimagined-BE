import express from "express";
import { dataBaseConnection } from "./db/mongoose.js";
import { dataBaseConnection } from './db/mongoose.js'
import router from './routes/routes.js'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const app = express();
app.use(cors())
app.use(express.json())
app.use(router)

app.listen(3000, () => {
  console.log("server connected");
});
