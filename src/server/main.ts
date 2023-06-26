// NPM Packages
require('dotenv').config()
import express, { Request, Response, NextFunction, RequestHandler, ErrorRequestHandler } from 'express';
import ViteExpress from "vite-express";

// ViteExpress.config({ mode: "production" })

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
    console.log(error);
  }
};

connectToMongoDB();

//Parse incoming request

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Vite Testing Route

// Render HTML Pages with Express - Vite already serves static files on dev mode

// app.use(express.static(path.join(__dirname, 'dist')));

// Routers

      /*** Authentication Router ***/

app.use('/', authRouter)

      /*** New/Save/Load Project Router ***/

app.use('/proj', projRouter)

// Global Error Handler

app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
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
