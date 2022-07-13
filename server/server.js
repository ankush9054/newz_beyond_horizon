import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import Connection from "./database/db.js";
import DefaultData from "./default.js";
import Route from "./routes/route.js";

const app = express();
dotenv.config();

app.use(cors());
app.use("/", Route);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const PORT = process.env.PORT || 8000;

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const URL =
  process.env.MONGODB_URI ||
  `mongodb://${username}:${password}@cluster0-shard-00-00.uudrf.mongodb.net:27017,cluster0-shard-00-01.uudrf.mongodb.net:27017,cluster0-shard-00-02.uudrf.mongodb.net:27017/Cluster0?ssl=true&replicaSet=atlas-hugc90-shard-0&authSource=admin&retryWrites=true&w=majority`;

Connection(URL);

app.listen(PORT, () =>
  console.log(`server is running sucessfully at port ${PORT} `)
);
DefaultData();
