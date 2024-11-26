import { Router } from 'express';
import validateInput from '../middlewares/validation-middleware';
import authMiddleware from '../middlewares/auth-middleware';
import rateLimiter from '../middlewares/rateLimit-middleware';
import InvoiceController from '../controllers/invoice.controller';
import {
  createInvoiceSchema,
  updateInvoiceSchema,
} from '../validation/invoiceShema';

const InvoiceRouter = Router();

InvoiceRouter.post(
  '/',
  authMiddleware,
  rateLimiter,
  validateInput(createInvoiceSchema),
  InvoiceController.postInvoice,
);
InvoiceRouter.get('/', authMiddleware, InvoiceController.getInvoices);
InvoiceRouter.put(
  '/:id',
  authMiddleware,
  rateLimiter,
  validateInput(updateInvoiceSchema),
  InvoiceController.updateInvoice,
);
InvoiceRouter.delete('/:id', authMiddleware, InvoiceController.deleteInvoice);

export default InvoiceRouter;
