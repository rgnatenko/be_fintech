import { Router } from 'express';
import ProjectController from '../controllers/project.controller';

const ProjectRouter = Router();

ProjectRouter.post('/', ProjectController.postProject);
ProjectRouter.get('/', ProjectController.getProjects);
ProjectRouter.put('/:id', ProjectController.updateProject);
ProjectRouter.delete('/:id', ProjectController.deleteProject);

export default ProjectRouter;
