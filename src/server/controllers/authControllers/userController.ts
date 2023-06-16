// MongoDB Import
import mongoose from 'mongoose';
const models = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

interface CreateUserRequest {
    body: {
      username: string;
      password: string;
    };
}

interface UserController {
    createUser: (req: CreateUserRequest, res: any, next: any) => Promise<void>;
    verifyUser: (req: CreateUserRequest, res: any, next: any) => Promise<void>;
    logOutUser: (req: any, res: any, next: any) => Promise<void>;
}

const userController: UserController = {
    createUser: async (req, res, next) => {

        const {username, password} = req.body

        if(!username || !password){
            return next({
                log: 'userController createUser error',
                status: 400,
                message: `Username and password is required`,
              });
        }
        try{
            const userDoc = await models.User.create({username, password})
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

                bcrypt.compare(password, hashedPW, (err: any, res: any) => {
                    if (err) {
                    return next(err);
                    }
                
                    if (res) {
                    res.locals.user = userExist
                    console.log('Password is correct');
                    return next();
                    } else {
                    res.locals.user = userExist
                    console.log('Password is incorrect');
                    return next();
                    }
                });
            }
            return next()
        }   catch (err) {
            return next({
              log: 'userController',
              status: 400,
              message: `Error in returning verifyUser function Controller, ${err}`,
            });
        };
    },
    logOutUser: async (req, res, next) => {
        try{
            console.log('Logout User')
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