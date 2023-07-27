import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

export const dataBaseConnection = mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log('connected to server')
  })
  .catch(() => {
    console.log('not connected')
  })
