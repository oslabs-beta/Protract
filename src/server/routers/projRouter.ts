import express from 'express';
import projController from '../controllers/projControllers/projController';
const router = express.Router();

// New Project - '/proj/new'

router.post('/new', projController.newProj, (req: any, res: any) => {
  console.log(res.locals.newProj)  
  return res.status(200).json('new Project Added');
});

// Save Project fetch to '/proj/save'

router.post('/save', projController.saveProj, (req: any, res: any) => {
  console.log(res.locals.newProj)  
  return res.status(200).json('Project has been Saved');
});

// Load Project - fetch to '/proj/load'

router.post('/load', projController.loadProj, (req: any, res: any) => {
  console.log(res.locals.newProj)  
  return res.status(200).json('Project has been Loaded');
});

module.exports = router;
