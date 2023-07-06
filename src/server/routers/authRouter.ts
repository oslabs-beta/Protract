import express, { Request, Response, NextFunction, RequestHandler } from 'express';
const router = express.Router();

// MongoDB Imports
const models = require('../models/userModel');
import userController from '../controllers/authControllers/userController'
import cookieController from '../controllers/cookieControllers/cookieController'
import sessionController from '../controllers/cookieControllers/sessionController'

// Check if User is already Logged in and a Session exists - fetch to /

router.get('/loggedIn', userController.isLoggedIn, async (req: Request, res: Response) => {
  if(res.locals.session === null){
    res.status(200).json('User is currently not logged in')
  } else {
    const { cookieId } = res.locals.session
    const userDoc = await models.User.findOne({_id: cookieId})
    res.status(200).json(userDoc.username)
  }
})

// Signup User- fetch to /signup

router.post('/signup', userController.createUser, cookieController.setSSIDCookie, sessionController.startSession, (req: Request, res: Response) => {
  return res.status(200).json('Sign Up succesful');
});

// Login User - fetch to /login

router.post('/login', userController.verifyUser, cookieController.setSSIDCookie, sessionController.startSession, (req: Request, res: Response) => {
  return res.status(200).json('Logged in successfully');
});

// Logout User - fetch to /logout

router.patch('/logout', userController.logOutUser, (req: Request, res: Response) => {
  return res.status(200).json('Logged out successfully');
});


module.exports = router;
