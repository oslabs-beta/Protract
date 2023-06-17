import express, { Request, Response, NextFunction, RequestHandler } from 'express';

interface CookieController {
    setCookie: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    setSSIDCookie: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
const cookieController: CookieController = {

// setCookie Test

setCookie: async (req, res, next) => {
    console.log('cookie created')
    res.cookie('Project', 'Protract');
    return next();
  },

// Cookie is set after user successfully signs up or logs in
// setSSIDCookie - store the user id in a cookie


setSSIDCookie: async (req, res, next) => {
    const options = {
        httpOnly: true
    }
    const { id } = res.locals.user
    try{
        res.cookie('SSID', id, options);
        console.log('SSID cookie successfully created')
        return next();
    } catch(err) {
        return next({
            log: 'cookieController',
            status: 400,
            message: `Error in returning setSSIDCookie Controller, ${err}`,
        });
    }
  }
}

export default cookieController;