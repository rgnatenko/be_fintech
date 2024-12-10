import mongoose from 'mongoose';
import ApiError from '../exceptions/api-error';
import { Errors } from '../exceptions/errors';
import { IEmployee } from '../models/employee.model';
import Project, { IProject } from '../models/project.model';

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
    const query = {
      userId,
      ...filter,
    };

    const projects = await Project.find(query)
      .skip(limit * (page - 1))
      .limit(limit);

    if (!projects) {
      throw new ApiError(Errors.ProjectsError);
    }

    return projects;
  }

  async postProject(project: IProject) {
    if (
      !project.description ||
      !project.name ||
      !project.budget ||
      !project.status
    ) {
      throw new ApiError(Errors.InvalidProjectData);
    }

    const newProject = await Project.create(project);
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

  async addAdmin(projectId: string, adminId: mongoose.Types.ObjectId | string) {
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { $addToSet: { admins: adminId } },
      { new: true },
    );

    if (!updatedProject) {
      throw new ApiError(Errors.ProjectNotFound);
    }
  }

  async deleteAdmin(projectId: string, adminId: string) {
    const updatedProject = await Project.findByIdAndUpdate(projectId, {
      $pull: { admins: adminId },
    });

    if (!updatedProject) {
      throw new ApiError(Errors.ProjectNotFound);
    }
  }

  async addTask(
    projectId: mongoose.Types.ObjectId | string,
    taskId: mongoose.Types.ObjectId | string,
  ) {
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      {
        $addToSet: { tasks: taskId },
      },
      { new: true },
    );

    if (!updatedProject) {
      throw new ApiError(Errors.ProjectNotFound);
    }
  }

  async removeTask(
    projectId: mongoose.Types.ObjectId | string,
    taskId: mongoose.Types.ObjectId | string,
  ) {
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      {
        $pull: { tasks: taskId },
      },
      { new: true },
    );

    if (!updatedProject) {
      throw new ApiError(Errors.ProjectNotFound);
    }
  }
}

export default new ProjectService();
