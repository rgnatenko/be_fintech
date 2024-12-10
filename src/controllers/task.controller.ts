import { Request, Response, NextFunction } from 'express';
import { BaseController } from './base.controller';
import TaskService from '../services/task.service';
import { ITask } from '../models/task.model';
import { getDefaultEndDate } from '../utils/date';
import ProjectService from '../services/project.service';
import EmployeeService from '../services/employee.service';

class TaskController extends BaseController {
  constructor() {
    super();
    this.getTasks = this.getTasks.bind(this);
    this.postTask = this.postTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  async getTasks(req: Request, res: Response, next: NextFunction) {
    try {
      let { page, limit, filter } = req.body;
      const filterParam = this.getFilter(filter);

      const tasks = await TaskService.getTasks(page, limit, filterParam);

      res.json(tasks);
    } catch (e) {
      next(e);
    }
  }

  async postTask(req: Request, res: Response, next: NextFunction) {
    try {
      const task: ITask = req.body;
      const defaultProjectEndDate = getDefaultEndDate();

      const newTask = await TaskService.postTask({
        ...task,
        tags: task.tags ?? [],
        startDate: task.startDate ?? new Date(),
        endDate: task.endDate ?? defaultProjectEndDate,
        status: task.status ?? 'Not-started',
        priority: task.priority ?? 'NORMAL',
        employees: task.employees ?? [],
      });

      await ProjectService.addTask(newTask.projectId, newTask._id);

      res.status(201).json(newTask);
    } catch (e) {
      next(e);
    }
  }

  async updateTask(req: Request, res: Response, next: NextFunction) {
    try {
      const taskId = req.params.id;
      const { ...data } = req.body;

      await TaskService.getTaskById(taskId);

      const updatedTask = await TaskService.updateTask(taskId, data);

      res.status(200).json(updatedTask);
    } catch (e) {
      next(e);
    }
  }

  async deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
      const taskId = req.params.id;
      const taskToDelete = await TaskService.getTaskById(taskId);

      const deletedTask = await TaskService.deleteTask(taskId);

      await ProjectService.removeTask(taskToDelete.projectId, taskId);

      res.json(deletedTask);
    } catch (e) {
      next(e);
    }
  }
}

export default new TaskController();
