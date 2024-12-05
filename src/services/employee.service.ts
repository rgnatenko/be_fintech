import mongoose from 'mongoose';
import ApiError from '../exceptions/api-error';
import { Errors } from '../exceptions/errors';
import Employee, { IEmployee, Position } from '../models/employee.model';
import Project, { IProject } from '../models/project.model';

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
    const employees = await Employee.find(filter)
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
    const employee = await Employee.findByIdAndUpdate(
      employeeId,
      { $addToSet: { assignedProjects: projectId } },
      { new: true },
    );

    if (!employee) throw new ApiError(Errors.EmployeeNotFound);

    return employee;
  }

  async unassignProject(employeeId: string, projectId: string) {
    const employee = await Employee.findByIdAndUpdate(employeeId, {
      $pull: { assignedProjects: projectId },
    });

    if (!employee) throw new ApiError(Errors.EmployeeNotFound);

    return employee;
  }

  async assignTask(
    employeeId: mongoose.Types.ObjectId | string,
    taskId: mongoose.Types.ObjectId | string,
  ) {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      {
        $addToSet: { tasks: taskId },
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
        $pull: { tasks: taskId },
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
