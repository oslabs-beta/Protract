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
      // console.log(title, root, users);
      const arrObj = [users]
        try {
          const projDoc = await Project.create({title, root, users: arrObj})
          res.locals.newProj = 'Project has been saved';
          return next();
        } catch (err) {
          return next({
            log: 'saveProject Controller',
            status: 400,
            message: `Error in returning saveProject Controller, ${err}`,
          });
        }
      },

      updateProj: async (req, res, next) => {
        const {username, project, root} = req.body;
        console.log('this is the username and proj', username, project)
        try {
          const userInfo = {title: project, users: username};
          const projDoc = await Project.findOneAndUpdate(userInfo, { $set: {root}}, {new: true});
          console.log(projDoc);
          res.locals.newProj = 'Project has been updated';
          return next()
        } catch (err) {
          console.log(err)
        }
      },

      loadProj: async (req, res, next) => {
        const {id} = req.params;
        try {
          const projects = await Project.find({users: id});
          console.log(projects)
          res.locals.projects = projects
          return next();
        } catch (err) {
          return next({
            log: 'loadProj Controller',
            status: 400,
            message: `Error in returning loadProjController, ${err}`,
          });
        }
      },

      deleteProj: async (req, res, next) => {
        const {username, title} = req.body;
        try {
          const userInfo = {title, users: username}
          const deleted = await Project.findOneAndDelete(userInfo)
          console.log(deleted)
          res.locals.deleted = deleted
          return next()
        } catch (err) {
          return next({
            log: 'deleteProj Project Controller',
            status: 400,
            message: `Error in returning deleteProj Controller, ${err}`,
          });
        }
      }
};

export default projController;
