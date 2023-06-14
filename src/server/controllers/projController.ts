interface ProjController {
    newProj: (req: any, res: any, next: any) => Promise<void>;
    saveProj: (req: any, res: any, next: any) => Promise<void>;
    loadProj: (req: any, res: any, next: any) => Promise<void>;
}

//  Project Controllers for New/Save/Load Projects

const projController: ProjController = {
    newProj: async (req, res, next) => {
      try {
        res.locals.newProj = 'New Project has been Added';
        return next();
      } catch (err) {
        return next({
          log: 'newProject Controller',
          status: 400,
          message: `Error in returning newProject Controller, ${err}`,
        });
      }
    },
    saveProj: async (req, res, next) => {
        try {
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
      loadProj: async (req, res, next) => {
        try {
          res.locals.newProj = 'Project has been loaded';
          return next();
        } catch (err) {
          return next({
            log: 'loadProject Controller',
            status: 400,
            message: `Error in returning loadProject Controller, ${err}`,
          });
        }
      },
};

export default projController;