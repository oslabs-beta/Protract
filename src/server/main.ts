// NPM Packages
require('dotenv').config()
import express from "express";
import ViteExpress from "vite-express";

const path = require('path');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// Router Imports

const authRouter = require('../server/routers/authRouter');
const projRouter = require('../server/routers/projRouter');


// Controller Imports

// Connect to MongoDB Database

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Failed to connect to MongoDB');
  }
};

// connectToMongoDB();

//Parse incoming request

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Vite Testing Route

app.get("/hello", (_, res) => {
  res.send("Hello Vite + React + TypeScript!");
});

// Render HTML Pages with Express

app.use(express.static(path.join(__dirname, 'public')));

// Routers

      /*** Authentication Router ***/

app.use('/', authRouter)

      /*** New/Save/Load Project Router ***/

app.use('/proj', projRouter)

// Global Error Handler

app.use((err: any, req: any, res: any, next: any) => {
  const defaultError = {
    log: 'Express error handler caught, unknown middleware error',
    status: 500,
    message: { err: 'There has been an error' },
  };
  const errorObj = Object.assign({}, defaultError, err);
  console.log(errorObj);
  return res.status(errorObj.status).json(errorObj.message);
});

// Vite Port
ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);

