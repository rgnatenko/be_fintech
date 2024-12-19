import { Router } from 'express';
import authMiddleware from '../middlewares/auth-middleware';
import rateLimiter from '../middlewares/rateLimit-middleware';
import validateInput from '../middlewares/validation-middleware';
import {
  createFinancialPlanSchema,
  updateFinancialPlanSchema,
} from '../validation/financialPlanSchema';
import FinancialPlanController from '../controllers/financialPlan.controller';

const FinancialPlanRouter = Router();

FinancialPlanRouter.use(authMiddleware);
FinancialPlanRouter.use(rateLimiter);

FinancialPlanRouter.post(
  '/',
  validateInput(createFinancialPlanSchema),
  FinancialPlanController.postFinancialPlan,
);
FinancialPlanRouter.get('/', FinancialPlanController.getFinancialPlans);
FinancialPlanRouter.get('/:id', FinancialPlanController.getFinancialPlan);
FinancialPlanRouter.put(
  '/:id',
  validateInput(updateFinancialPlanSchema),
  FinancialPlanController.updateFinancialPlan,
);
FinancialPlanRouter.delete('/:id', FinancialPlanController.deleteFinancialPlan);

export default FinancialPlanRouter;
