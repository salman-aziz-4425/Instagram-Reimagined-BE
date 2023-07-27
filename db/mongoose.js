import mongoose from "mongoose";

export const dataBaseConnection = mongoose
  .connect(
    "mongodb+srv://salmanaziz:salman999@cluster0.gllatbf.mongodb.net/Instagram?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to server");
  })
  .catch(() => {
    console.log("not connected");
  });
