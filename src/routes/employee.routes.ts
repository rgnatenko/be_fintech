import { Router } from 'express';
import authMiddleware from '../middlewares/auth-middleware';
import rateLimiter from '../middlewares/rateLimit-middleware';
import validateInput from '../middlewares/validation-middleware';
import EmployeeController from '../controllers/employee.controller';
import {
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
EmployeeRouter.post('/:id/assign-project', EmployeeController.assignProject);
EmployeeRouter.post(
  '/:id/unassign-project',
  EmployeeController.unassignProject,
);
EmployeeRouter.post('/:id/assign-task', EmployeeController.assignTask);
EmployeeRouter.post('/:id/unassign-task', EmployeeController.unassignTask);

export default EmployeeRouter;
