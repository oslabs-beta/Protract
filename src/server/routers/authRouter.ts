import express from 'express';
import authController from '../controllers/projController';
const router = express.Router();

// **** Authentication Route ****/

// Signup - fetch to /signup

router.post('/signup', (req: any, res: any) => {
  return res.status(200).json('sign up');
});

// Login - fetch to /login

router.post('/login', (req: any, res: any) => {
  return res.status(200).json('log in');
});

module.exports = router;
