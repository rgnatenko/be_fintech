import { Router } from 'express';
import ProjectController from '../controllers/project.controller';
import validateInput from '../middlewares/validation-middleware';
import {
  createProjectSchema,
  updateProjectSchema,
} from '../validation/projectSchema';
import authMiddleware from '../middlewares/auth-middleware';
import rateLimiter from '../middlewares/rateLimit-middleware';

const ProjectRouter = Router();

ProjectRouter.post(
  '/',
  authMiddleware,
  rateLimiter,
  validateInput(createProjectSchema),
  ProjectController.postProject,
);
ProjectRouter.get('/', authMiddleware, ProjectController.getProjects);
ProjectRouter.put(
  '/:id',
  authMiddleware,
  rateLimiter,
  validateInput(updateProjectSchema),
  ProjectController.updateProject,
);
ProjectRouter.delete('/:id', authMiddleware, ProjectController.deleteProject);

export default ProjectRouter;
