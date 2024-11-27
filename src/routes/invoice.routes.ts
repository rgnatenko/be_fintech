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

InvoiceRouter.use(authMiddleware);
InvoiceRouter.use(rateLimiter);

InvoiceRouter.post(
  '/',
  validateInput(createInvoiceSchema),
  InvoiceController.postInvoice,
);
InvoiceRouter.get('/', InvoiceController.getInvoices);
InvoiceRouter.put(
  '/:id',
  validateInput(updateInvoiceSchema),
  InvoiceController.updateInvoice,
);
InvoiceRouter.delete('/:id', InvoiceController.deleteInvoice);

export default InvoiceRouter;
