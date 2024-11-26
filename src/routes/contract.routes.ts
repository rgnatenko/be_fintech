import { Router } from 'express';
import validateInput from '../middlewares/validation-middleware';
import authMiddleware from '../middlewares/auth-middleware';
import rateLimiter from '../middlewares/rateLimit-middleware';
import ContractController from '../controllers/contract.controller';
import {
  createContractSchema,
  updateContractSchema,
} from '../validation/contractSchema';

const ContractRouter = Router();

ContractRouter.post(
  '/',
  authMiddleware,
  rateLimiter,
  validateInput(createContractSchema),
  ContractController.postContract,
);
ContractRouter.get('/', authMiddleware, ContractController.getContracts);
ContractRouter.put(
  '/:id',
  authMiddleware,
  rateLimiter,
  validateInput(updateContractSchema),
  ContractController.updateContract,
);
ContractRouter.delete('/:id', authMiddleware, ContractController.deleteContract);

export default ContractRouter;
