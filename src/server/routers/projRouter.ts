import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import projController from '../controllers/projControllers/projController';
const router = express.Router();

// Save Project fetch to '/proj/save'

router.post('/', projController.saveProj, (req: Request, res: Response) => {
  return res.status(200).json('Project has been Saved');
});

// update a project '/proj'
router.patch('/', projController.updateProj, (req: Request, res: Response) => {
  return res.status(200).json('Project Updated');
})

// Load Project - fetch to '/proj/load'

router.get('/:id', projController.loadProj, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.projects);
});

router.delete('/', projController.deleteProj, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.deleted)
})

module.exports = router;
