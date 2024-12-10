import mongoose from 'mongoose';
import ApiError from '../exceptions/api-error';
import { Errors } from '../exceptions/errors';
import Task, {
  ITask,
  TaskPriority,
  Tag,
  TaskStatus,
} from '../models/task.model';
import { IEmployee } from '../models/employee.model';

class TaskService {
  async getTasks(
    page: number = 1,
    limit: number = 100,
    filter: Partial<ITask>,
  ) {
    const tasks = await Task.find(filter)
      .skip(limit * (page - 1))
      .limit(limit);

    if (!tasks) {
      throw new ApiError(Errors.TasksError);
    }

    return tasks;
  }

  async getTaskById(id: mongoose.Types.ObjectId | string) {
    const task = await Task.findById(id);

    if (!task) {
      throw new ApiError(Errors.TaskNotFound);
    }

    return task;
  }

  async postTask(task: ITask) {
    if (!task.description || !task.title || !task.projectId) {
      throw new ApiError(Errors.InvalidTaskData);
    }

    const newTask = await Task.create(task);
    return newTask;
  }

  async updateTask(
    id: string,
    data: Partial<{
      title: string;
      description: string;
      endDate: Date;
      priority: TaskPriority;
      tags: Tag[];
      timeEstimate: string;
      status: TaskStatus;
    }>,
  ) {
    const updatedTask = await Task.findOneAndUpdate({ _id: id }, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      throw new ApiError(Errors.TaskNotFound);
    }

    return updatedTask;
  }

  async deleteTask(id: string) {
    const deletedTask = await Task.deleteOne({ _id: id });

    if (!deletedTask) {
      throw new ApiError(Errors.TaskNotFound);
    }

    return deletedTask;
  }

  async addEmployee(
    taskId: mongoose.Types.ObjectId | string,
    employee: IEmployee,
  ) {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        $addToSet: { employees: employee },
      },
      { new: true },
    );

    if (!updatedTask) {
      throw new ApiError(Errors.TaskNotFound);
    }
  }

  async deleteEmployee(
    taskId: mongoose.Types.ObjectId | string,
    employeeId: mongoose.Types.ObjectId | string,
  ) {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        $pull: { employees: { _id: employeeId } },
      },
      { new: true },
    );

    if (!updatedTask) {
      throw new ApiError(Errors.TaskNotFound);
    }
  }
}

export default new TaskService();
