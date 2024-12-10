import { Request, Response, NextFunction } from 'express';
import { BaseController } from './base.controller';
import EmployeeService from '../services/employee.service';
import { Position } from '../models/employee.model';
import mongoose from 'mongoose';
import Project, { IProject } from '../models/project.model';
import ApiError from '../exceptions/api-error';
import { Errors } from '../exceptions/errors';
import ProjectService from '../services/project.service';
import TaskService from '../services/task.service';

interface PostEmployeeBody {
  name: string;
  position: Position;
  contract: mongoose.Schema.Types.ObjectId | string;
  startDate: Date;
  endDate: Date;
}

interface AssignProjectBody {
  projectId: string;
}

class ContractController extends BaseController {
  constructor() {
    super();
    this.getEmployees = this.getEmployees.bind(this);
    this.postEmployee = this.postEmployee.bind(this);
    this.updateEmployee = this.updateEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }

  async getEmployees(req: Request, res: Response, next: NextFunction) {
    try {
      let { page, limit, filter } = req.body;
      const filterParam = this.getFilter(filter);

      const employees = await EmployeeService.getEmployees(
        page,
        limit,
        filterParam,
      );

      res.json(employees);
    } catch (e) {
      next(e);
    }
  }

  async postEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const employee: PostEmployeeBody = req.body;

      const newEmployee = await EmployeeService.postEmployee({
        ...employee,
        assignedProjects: [],
        tasks: [],
      });

      res.status(201).json(newEmployee);
    } catch (e) {
      next(e);
    }
  }

  async updateEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const employeeId = req.params.id;
      const { assignedProjects, ...data } = req.body;

      let validatedProjects: IProject[] = [];
      if (assignedProjects && assignedProjects.length > 0) {
        validatedProjects = await Project.find({
          _id: { $in: assignedProjects },
        });

        if (validatedProjects.length !== assignedProjects.length) {
          throw new ApiError(Errors.InvalidProjectIds);
        }
      }

      const updateData = {
        ...data,
        assignedProjects: validatedProjects,
      };

      const updatedEmployee = await EmployeeService.updateEmployee(
        employeeId,
        updateData,
      );

      res.status(200).json(updatedEmployee);
    } catch (e) {
      next(e);
    }
  }

  async deleteEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const employeeId = req.params.id;

      const deletedEmployee = await EmployeeService.deleteEmployee(employeeId);

      res.json(deletedEmployee);
    } catch (e) {
      next(e);
    }
  }

  async assignProject(req: Request, res: Response, next: NextFunction) {
    try {
      const employeeId = req.params.id;
      const { projectId }: AssignProjectBody = req.body;

      await ProjectService.addAdmin(projectId, employeeId);

      const updatedEmployee = await EmployeeService.assignProject(
        employeeId,
        projectId,
      );

      res.status(200).json(updatedEmployee);
    } catch (e) {
      next(e);
    }
  }

  async unassignProject(req: Request, res: Response, next: NextFunction) {
    try {
      const employeeId = req.params.id;
      const { projectId } = req.body;

      const updatedEmployee = await EmployeeService.unassignProject(
        employeeId,
        projectId,
      );

      await ProjectService.deleteAdmin(projectId, employeeId);

      res.status(200).json(updatedEmployee);
    } catch (e) {
      next(e);
    }
  }

  async assignTask(req: Request, res: Response, next: NextFunction) {
    try {
      const employeeId = req.params.id;
      const { taskId } = req.body;

      await TaskService.getTaskById(taskId);

      const updatedEmployee = await EmployeeService.assignTask(
        employeeId,
        taskId,
      );

      await TaskService.addEmployee(taskId, updatedEmployee);

      res.status(200).json(updatedEmployee);
    } catch (e) {
      next(e);
    }
  }

  async unassignTask(req: Request, res: Response, next: NextFunction) {
    try {
      const employeeId = req.params.id;
      const { taskId } = req.body;

      const updatedEmployee = await EmployeeService.unassignTask(
        employeeId,
        taskId,
      );

      await TaskService.deleteEmployee(taskId, employeeId);

      res.status(200).json(updatedEmployee);
    } catch (e) {
      next(e);
    }
  }
}

export default new ContractController();
