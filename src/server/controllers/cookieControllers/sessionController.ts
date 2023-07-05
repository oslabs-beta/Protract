import express, { Request, Response, NextFunction, RequestHandler, ErrorRequestHandler } from 'express';
import Session from '../../models/sessionModel'

interface SessionController {
    startSession: (req: Request, res: Response, next: NextFunction) => Promise <void>;
}

const sessionController: SessionController = {
    startSession: async (req, res, next) => {
        const { id } = res.locals.user
        try{
            const sessionDoc = await Session.create({cookieId: id});
            return next()
        } catch (err) {
            return next({
              log: 'startSession Controller',
              status: 400,
              message: `Session error, please try again.`,
            });
          }
    }
}









export default sessionController
