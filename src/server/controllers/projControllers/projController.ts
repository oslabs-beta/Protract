import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import Project from '../../models/projectModel'

interface ProjController {
    saveProj: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateProj: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    loadProj: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteProj: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

//  Project Controllers for New/Save/Load Projects

const projController: ProjController = {
    saveProj: async (req, res, next) => {
      const {title, root, users} = req.body;
      const arrObj = [users]
        try {
          const projDoc = await Project.create({title, root, users: arrObj})
          res.locals.newProj = 'Project has been saved';
          return next();
        } catch (err) {
          return next({
            log: 'saveProject Controller',
            status: 400,
            message: `Unable to save project, please try again.`,
          });
        }
      },

      updateProj: async (req, res, next) => {
        const {username, project, root} = req.body;
        try {
          const userInfo = {title: project, users: username};
          const projDoc = await Project.findOneAndUpdate(userInfo, { $set: {root}}, {new: true});
          res.locals.newProj = 'Project has been updated';
          return next()
        } catch (err) {
          return next({
            log: 'updateProj Controller',
            status: 400,
            message: `Unable to update project, please try again.`,
          });
        }
      },

      loadProj: async (req, res, next) => {
        const {id} = req.params;
        try {
          const projects = await Project.find({users: id});
          res.locals.projects = projects
          return next();
        } catch (err) {
          return next({
            log: 'loadProj Controller',
            status: 400,
            message: `Unable to load project, please try again`,
          });
        }
      },

      deleteProj: async (req, res, next) => {
        const {username, title} = req.body;
        try {
          const userInfo = {title, users: username}
          const deleted = await Project.findOneAndDelete(userInfo)
          res.locals.deleted = deleted
          return next()
        } catch (err) {
          return next({
            log: 'deleteProj Project Controller',
            status: 400,
            message: `Unable to delete project, please try again`,
          });
        }
      }
};

export default projController;
