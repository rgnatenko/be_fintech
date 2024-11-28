import { Request, Response, NextFunction } from 'express';
import { IProject } from '../models/project.model';
import ProjectService from '../services/project.service';
import { getDefaultEndDate } from '../utils/date';
import { BaseController } from './base.controller';

class ProjectController extends BaseController {
  constructor() {
    super();
    this.getProjects = this.getProjects.bind(this);
    this.postProject = this.postProject.bind(this);
    this.updateProject = this.updateProject.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
  }

  async getProjects(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = this.validateUser(req);
      let { page, limit, filter } = req.body;
      const filterParam = this.getFilter(filter);

      const projects = await ProjectService.getProjects(
        userId,
        page,
        limit,
        filterParam,
      );

      res.json(projects);
    } catch (e) {
      next(e);
    }
  }

  async postProject(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = this.validateUser(req);
      const project: IProject = req.body;
      const defaultProjectEndDate = getDefaultEndDate();

      const newProject = await ProjectService.postProject({
        ...project,
        startDate: new Date(),
        endDate: project.endDate || defaultProjectEndDate,
        status: project.status || 'NEW',
        userId,
      });

      res.status(201).json(newProject);
    } catch (e) {
      next(e);
    }
  }

  async updateProject(req: Request, res: Response, next: NextFunction) {
    try {
      const projectId = req.params.id;
      const { ...data } = req.body;

      const updatedProject = await ProjectService.updateProject(
        projectId,
        data,
      );

      res.status(200).json(updatedProject);
    } catch (e) {
      next(e);
    }
  }

  async deleteProject(req: Request, res: Response, next: NextFunction) {
    try {
      const projectId = req.params.id;

      const deletedProject = await ProjectService.deleteProject(projectId);

      res.json(deletedProject);
    } catch (e) {
      next(e);
    }
  }
}

export default new ProjectController();
