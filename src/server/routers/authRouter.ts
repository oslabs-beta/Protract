import express, { Request, Response, NextFunction, RequestHandler } from 'express';
const router = express.Router();

// MongoDB Imports
const models = require('../models/userModel');
import userController from '../controllers/authControllers/userController'
import cookieController from '../controllers/cookieControllers/cookieController'
import sessionController from '../controllers/cookieControllers/sessionController'


// Signup User- fetch to /signup

router.post('/signup', userController.createUser, cookieController.setSSIDCookie, sessionController.startSession, (req: Request, res: Response) => {
  console.log('Sign up has been successful')
  return res.status(200).json('Sign Up succesful');
});

// Login User - fetch to /login

router.post('/login', userController.verifyUser, cookieController.setSSIDCookie, sessionController.startSession, (req: Request, res: Response) => {
  console.log('Login has been successful')
  return res.status(200).json('Logged in successfully');
});

// Logout User - fetch to /logout

router.post('/logout', userController.logOutUser, (req: Request, res: Response) => {
  console.log('Logout is successful')
  return res.status(200).json('Logged out successfully');
});


module.exports = router;
