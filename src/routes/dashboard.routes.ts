import { Router } from 'express';
import DashboardController from '../controllers/dashboard.controller';
import authMiddleware from '../middlewares/auth-middleware';

const DashboardRouter = Router();

DashboardRouter.get(
  '/overview',
  authMiddleware,
  DashboardController.getOverview,
);

DashboardRouter.get('/charts', authMiddleware, DashboardController.getCharts);

export default DashboardRouter;
