import mongoose from 'mongoose';
import ApiError from '../exceptions/api-error';
import { Errors } from '../exceptions/errors';
import Employee, { IEmployee, Position } from '../models/employee.model';
import Project, { IProject } from '../models/project.model';
import { getQuery } from '../utils/query';
import { ITask } from '../models/task.model';

class EmployeeService {
  async getEmployees(
    page: number = 1,
    limit: number = 100,
    filter: {
      name: string;
      contract: string;
      position: Position;
      startDate: Date;
      endDate: Date;
    },
  ) {
    const query = getQuery(filter.contract, filter);

    const employees = await Employee.find(query)
      .skip(limit * (page - 1))
      .limit(limit);

    if (!employees) {
      throw new ApiError(Errors.EmployeesError);
    }

    return employees;
  }

  async postEmployee(employee: IEmployee) {
    if (!employee.name || !employee.contract || !employee.position) {
      throw new ApiError(Errors.InvalidEmployeeData);
    }

    const newEmployee = await Employee.create(employee);
    return newEmployee;
  }

  async updateEmployee(
    id: string,
    data: Partial<{
      name: string;
      position: Position;
      startDate: Date;
      endDate: Date;
      contract: string;
      assignedProjects: IProject[];
    }>,
  ) {
    const updatedEmployee = await Employee.findOneAndUpdate({ _id: id }, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedEmployee) {
      throw new ApiError(Errors.EmployeeNotFound);
    }

    return updatedEmployee;
  }

  async deleteEmployee(id: string) {
    const deletedEmployee = await Employee.deleteOne({ _id: id });

    if (!deletedEmployee) {
      throw new ApiError(Errors.EmployeeNotFound);
    }

    return deletedEmployee;
  }

  async assignProject(employeeId: string, projectId: string) {
    const project = await Project.findById(projectId);
    if (!project) throw new ApiError(Errors.ProjectNotFound);

    const employee = await Employee.findByIdAndUpdate(
      employeeId,
      { $addToSet: { assignedProjects: project } },
      { new: true },
    );

    if (!employee) throw new ApiError(Errors.EmployeeNotFound);

    return employee;
  }

  async unassignProject(employeeId: string, projectId: string) {
    const project = await Project.findById(projectId);
    if (!project) throw new ApiError(Errors.ProjectNotFound);

    const employee = await Employee.findByIdAndUpdate(employeeId, {
      $pull: { assignedProjects: { _id: projectId } },
    });

    if (!employee) throw new ApiError(Errors.EmployeeNotFound);

    return employee;
  }

  async assignTask(employeeId: mongoose.Types.ObjectId | string, task: ITask) {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      {
        $addToSet: { tasks: task },
      },
      { new: true },
    );

    if (!updatedEmployee) {
      throw new ApiError(Errors.EmployeeNotFound);
    }

    return updatedEmployee;
  }

  async unassignTask(
    employeeId: mongoose.Types.ObjectId | string,
    taskId: mongoose.Types.ObjectId | string,
  ) {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      {
        $pull: { tasks: { _id: taskId } },
      },
      { new: true },
    );

    if (!updatedEmployee) {
      throw new ApiError(Errors.EmployeeNotFound);
    }

    return updatedEmployee;
  }
}

export default new EmployeeService();
