import ApiError from '../exceptions/api-error';
import { Errors } from '../exceptions/errors';
import Project, { IProject } from '../models/project.model';
import { getQuery } from '../utils/query';

class ProjectService {
  async getProjects(
    userId: string,
    page: number = 1,
    limit: number = 100,
    filter: {
      name: string;
      description: string;
      startDate: Date;
      endDate: Date;
      budget: number;
      status: string;
    },
  ) {
    const query = getQuery(userId, filter);

    const projects = await Project.find(query)
      .skip(limit * (page - 1))
      .limit(limit);

    if (!projects) {
      throw new ApiError(Errors.ProjectsError);
    }

    return projects;
  }

  async postProject(project: IProject) {
    const newProject = await Project.create(project);

    if (!newProject) {
      throw new ApiError(Errors.ProjectsCreateError);
    }

    return newProject;
  }

  async updateProject(
    id: string,
    data: Partial<{
      name: string;
      description: string;
      startDate: string;
      endDate: Date;
      budget: number;
      status: string;
    }>,
  ) {
    const updatedProject = await Project.findOneAndUpdate({ _id: id }, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedProject) {
      throw new ApiError(Errors.ProjectNotFound);
    }

    return updatedProject;
  }

  async deleteProject(id: string) {
    const deletedProject = await Project.deleteOne({ _id: id });

    if (!deletedProject) {
      throw new ApiError(Errors.ProjectNotFound);
    }

    return deletedProject;
  }
}

export default new ProjectService();
