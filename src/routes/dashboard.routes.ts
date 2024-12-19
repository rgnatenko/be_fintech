import { Router } from 'express';
import DashboardController from '../controllers/dashboard.controller';
import validateInput from '../middlewares/validation-middleware';
import {
  createDashboardExpenseShema,
  createDashboardReceivableShema,
  createDashboardRevenueShema,
} from '../validation/dashboardSchema';
import authMiddleware from '../middlewares/auth-middleware';
import rateLimiter from '../middlewares/rateLimit-middleware';

const DashboardRouter = Router();

DashboardRouter.use(authMiddleware);
DashboardRouter.use(rateLimiter);

DashboardRouter.get('/overview', DashboardController.getOverview);

DashboardRouter.get('/charts', DashboardController.getCharts);
DashboardRouter.post(
  '/revenues',
  validateInput(createDashboardRevenueShema),
  DashboardController.createRevenue,
);
DashboardRouter.post(
  '/receivables',
  validateInput(createDashboardReceivableShema),
  DashboardController.createRevenue,
);
DashboardRouter.post(
  '/expenses',
  validateInput(createDashboardExpenseShema),
  DashboardController.createRevenue,
);

export default DashboardRouter;
