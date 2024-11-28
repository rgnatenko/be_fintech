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

ProjectRouter.use(authMiddleware);
ProjectRouter.use(rateLimiter);

ProjectRouter.post(
  '/',
  validateInput(createProjectSchema),
  ProjectController.postProject,
);
ProjectRouter.get('/', ProjectController.getProjects);
ProjectRouter.put(
  '/:id',
  validateInput(updateProjectSchema),
  ProjectController.updateProject,
);
ProjectRouter.delete('/:id', ProjectController.deleteProject);

export default ProjectRouter;
