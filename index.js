import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import authRouter from "./router/auth.route.js";
import { dbConnection } from "./db/connect.js";
import serviceRouter from "./router/service.route.js";
import path from 'path';

dotenv.config();
const app = express();
const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT;
const __dirname = path.resolve();

// ----- connecting to database -----
dbConnection(DB_URL);
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'], 
//   credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


// ------ Custom middlewares --------- 
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/service", serviceRouter);

// if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "public", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "build", "index.html"));
  });
// }

// ----- Errors handler ------
app.all("*", (req, res) => {
  res.status(500).json({
    status: 500,
    success: false,
    message: `Can not find ${req.originalUrl} on this server`,
  });
});

// -------- app listening port number ---------
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});