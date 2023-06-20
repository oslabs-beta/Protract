// MongoDB Import
import mongoose from 'mongoose';
import Session from '../../models/sessionModel'
const models = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;
import express, { Request, Response, NextFunction, RequestHandler, ErrorRequestHandler } from 'express';

interface UserController {
    isLoggedIn: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    verifyUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    logOutUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

const userController: UserController = {

    // Checks if a user is logged in

    isLoggedIn: async (req, res, next) => {
        const { SSID } = req.cookies
        try{
            const sessionDoc = await Session.findOne({ cookieId: SSID })
            res.locals.session = sessionDoc
            return next();
        } catch(err){
            return next({
            log: 'userController',
            status: 400,
            message: `Error in returning isLoggedIn function Controller, ${err}`,
            });
        }
    },

    // Signs up a new user

    createUser: async (req, res, next) => {

        let {username, password, email} = req.body;
        username = username.toLowerCase()

        console.log('usercontroller req body',req.body)

        if(!username || !password || !email){
            return next({
                log: 'userController createUser error',
                status: 400,
                message: `Username, password, and email is required`,
              });
        }
        try{
            const userDoc = await models.User.create({username, password, email})
            res.locals.user = userDoc
            console.log('UserController: User has been successfully created')
            return next()
        } catch (err) {
            return next({
              log: 'userController',
              status: 400,
              message: `Error in returning createUser function Controller, ${err}`,
            });
          }
    },

    // User Login, verifying credentials

    verifyUser: async (req, res, next) => {
        const {username, password} = req.body

        if(!username || !password){
            return next({
                log: 'userController verifyUser error',
                status: 400,
                message: `Username and password is required`,
              });
        }

        try{
            const userExist = await models.User.findOne({username})
            
            if(userExist){
                const hashedPW = userExist.password
                console.log(hashedPW)
                console.log('username is spelled correctly and is in database')

                bcrypt.compare(password, hashedPW, (err: any, valid: any) => {
                    if (err) {
                    return next(err);
                    }
                
                    if (valid) {
                    res.locals.user = userExist
                    console.log('Password is correct');
                    return next();
                    } 
                    else {
                    console.log('Password is incorrect');
                    return next({
                        log: 'userController',
                        status: 400,
                        message: `Error in returning verifyUser function Controller, invalid password ${err}`,
                      })
                    }
                });
            } else{
                return next({
                    log: 'userController',
                    status: 400,
                    message: `Error in returning verifyUser function Controller, invalid username`,
                  })
            }
        }   catch (err) {
            return next({
              log: 'userController',
              status: 400,
              message: `Error in returning verifyUser function Controller, ${err}`,
            });
        };
    },

    // Logout User

    logOutUser: async (req, res, next) => {
        try{
            // Grab User's current web SSID Cookies
            const {SSID} = req.cookies
            // Search and Delete MongoDB Session Database for cookieId that matches the user's current web SSID cookie
            const cookieExist = await Session.findOneAndDelete({cookieId: SSID})
            console.log('SSID Session in MongoDB has been deleted')
            return next()
        } catch (err) {
            return next({
              log: 'userController',
              status: 400,
              message: `Error in returning logOutUser function Controller, ${err}`,
            });
        };
    }
}

export default userController;