import express, { Request, Response, NextFunction, RequestHandler } from 'express';

interface CookieController {
    setSSIDCookie: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
const cookieController: CookieController = {

// Cookie is set after user successfully signs up or logs in
// setSSIDCookie - store the user id in a cookie

setSSIDCookie: async (req, res, next) => {
    const options = {
        httpOnly: true
    }
    const { id } = res.locals.user
    try{
        res.cookie('SSID', id, options);
        return next();
    } catch(err) {
        return next({
            log: 'cookieController',
            status: 400,
            message: `Cookie error, please try again.`,
        });
    }
  }
}

export default cookieController;
