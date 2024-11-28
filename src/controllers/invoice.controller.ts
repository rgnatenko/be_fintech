import { Request, Response, NextFunction } from 'express';
import InvoiceService from '../services/invoice.service';
import { IInvoice } from '../models/invoice.model';
import { BaseController } from './base.controller';

class InvoiceController extends BaseController {
  constructor() {
    super();
    this.getInvoices = this.getInvoices.bind(this);
    this.postInvoice = this.postInvoice.bind(this);
    this.updateInvoice = this.updateInvoice.bind(this);
    this.deleteInvoice = this.deleteInvoice.bind(this);
  }

  async getInvoices(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = this.validateUser(req);
      let { page, limit, filter } = req.body;
      const filterParam = this.getFilter(filter);

      const invoices = await InvoiceService.getInvoices(
        userId,
        page,
        limit,
        filterParam,
      );

      res.json(invoices);
    } catch (e) {
      next(e);
    }
  }

  async postInvoice(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = this.validateUser(req);
      const invoice: IInvoice = req.body;

      const newInvoice = await InvoiceService.postInvoice({
        ...invoice,
        status: invoice.status || 'UNPAID',
        userId,
      });

      res.status(201).json(newInvoice);
    } catch (e) {
      next(e);
    }
  }

  async updateInvoice(req: Request, res: Response, next: NextFunction) {
    try {
      const invoiceId = req.params.id;
      const { ...data } = req.body;

      const updatedInvoice = await InvoiceService.updateInvoice(
        invoiceId,
        data,
      );

      res.status(200).json(updatedInvoice);
    } catch (e) {
      next(e);
    }
  }

  async deleteInvoice(req: Request, res: Response, next: NextFunction) {
    try {
      const invoiceId = req.params.id;

      const deletedInvoice = await InvoiceService.deleteInvoice(invoiceId);

      res.json(deletedInvoice);
    } catch (e) {
      next(e);
    }
  }
}

export default new InvoiceController();
