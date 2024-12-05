import { Router } from 'express';
import authMiddleware from '../middlewares/auth-middleware';
import rateLimiter from '../middlewares/rateLimit-middleware';
import validateInput from '../middlewares/validation-middleware';
import EmployeeController from '../controllers/employee.controller';
import {
  assignProjectSchema,
  assignTaskSchema,
  createEmployeeSchema,
  updateEmployeeSchema,
} from '../validation/employeeSchema';

const EmployeeRouter = Router();

EmployeeRouter.use(authMiddleware);
EmployeeRouter.use(rateLimiter);

EmployeeRouter.post(
  '/',
  validateInput(createEmployeeSchema),
  EmployeeController.postEmployee,
);
EmployeeRouter.get('/', EmployeeController.getEmployees);
EmployeeRouter.put(
  '/:id',
  validateInput(updateEmployeeSchema),
  EmployeeController.updateEmployee,
);
EmployeeRouter.delete('/:id', EmployeeController.deleteEmployee);
EmployeeRouter.post(
  '/:id/assign-project',
  validateInput(assignProjectSchema),
  EmployeeController.assignProject,
);
EmployeeRouter.post(
  '/:id/unassign-project',
  validateInput(assignProjectSchema),
  EmployeeController.unassignProject,
);
EmployeeRouter.post(
  '/:id/assign-task',
  validateInput(assignTaskSchema),
  EmployeeController.assignTask,
);
EmployeeRouter.post(
  '/:id/unassign-task',
  validateInput(assignTaskSchema),
  EmployeeController.unassignTask,
);

export default EmployeeRouter;
