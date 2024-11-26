import { Request, Response, NextFunction } from 'express';
import ApiError from '../exceptions/api-error';
import { Errors } from '../exceptions/errors';
import InvoiceService from '../services/invoice.service';
import { IInvoice } from '../models/invoice.model';

class InvoiceController {
  constructor() {
    this.getInvoices = this.getInvoices.bind(this);
    this.postInvoice = this.postInvoice.bind(this);
    this.updateInvoice = this.updateInvoice.bind(this);
    this.deleteInvoice = this.deleteInvoice.bind(this);
  }

  private validateUser(req: Request) {
    if (!req.user || !req.user.id) {
      throw new ApiError(Errors.Unauthorized);
    }
    return req.user.id;
  }

  private getFilter(filter: any) {
    return filter || {};
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
