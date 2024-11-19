import express from 'express';
import UserController from '../controllers/user.controller';
import validateInput from '../middlewares/validation-middleware';
import registerSchema from '../validation/registerSchema';
import rateLimiter from '../middlewares/rateLimit-middleware';
import authMiddleware from '../middlewares/auth-middleware';

const UserRouter = express.Router();

UserRouter.post(
  '/register',
  rateLimiter,
  validateInput(registerSchema),
  UserController.register,
);
UserRouter.post(
  '/login',
  rateLimiter,
  validateInput(registerSchema),
  UserController.login,
);
UserRouter.post('/logout', authMiddleware, UserController.logout);
UserRouter.get('/activate/:link', UserController.activate);
UserRouter.get('/refresh', UserController.refresh);

export default UserRouter;
