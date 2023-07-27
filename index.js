import express from "express";
import { dataBaseConnection } from "./db/mongoose.js";
const app = express();

app.listen(3000, () => {
  console.log("server connected");
});
