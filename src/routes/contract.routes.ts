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

ContractRouter.use(authMiddleware);
ContractRouter.use(rateLimiter);

ContractRouter.post(
  '/',
  validateInput(createContractSchema),
  ContractController.postContract,
);
ContractRouter.get('/', ContractController.getContracts);
ContractRouter.put(
  '/:id',
  validateInput(updateContractSchema),
  ContractController.updateContract,
);
ContractRouter.delete('/:id', ContractController.deleteContract);

export default ContractRouter;
