import { Router } from 'express';
import authMiddleware from '../middlewares/auth-middleware';
import rateLimiter from '../middlewares/rateLimit-middleware';
import validateInput from '../middlewares/validation-middleware';
import TaskController from '../controllers/task.controller';
import { createTaskSchema, updateTaskSchema } from '../validation/taskSchema';

const TaskRouter = Router();

TaskRouter.use(authMiddleware);
TaskRouter.use(rateLimiter);

TaskRouter.post('/', validateInput(createTaskSchema), TaskController.postTask);
TaskRouter.get('/', TaskController.getTasks);
TaskRouter.put(
  '/:id',
  validateInput(updateTaskSchema),
  TaskController.updateTask,
);
TaskRouter.delete('/:id', TaskController.deleteTask);

export default TaskRouter;
