import ApiError from '../exceptions/api-error';
import { Errors } from '../exceptions/errors';
import Invoice, { IInvoice, InvoiceStatus } from '../models/invoice.model';

class InvoiceService {
  async getInvoices(
    userId: string,
    page: number = 1,
    limit: number = 100,
    filter: {
      client: string;
      dueDate: Date;
      invoiceNumber: number;
      status: InvoiceStatus;
    },
  ) {
    const query = { userId, ...filter };

    const invoices = await Invoice.find(query)
      .skip(limit * (page - 1))
      .limit(limit);

    if (!invoices) {
      throw new ApiError(Errors.InvoicesError);
    }

    return invoices;
  }

  async postInvoice(invoice: IInvoice) {
    if (
      !invoice.invoiceNumber ||
      !invoice.client ||
      !invoice.amount ||
      !invoice.status
    ) {
      throw new ApiError(Errors.InvalidInvoiceData);
    }

    const newInvoice = await Invoice.create(invoice);
    return newInvoice;
  }

  async updateInvoice(
    id: string,
    data: Partial<{
      invoiceNumber: string;
      amount: number;
      dueDate: Date;
      status: InvoiceStatus;
    }>,
  ) {
    const updatedInvoice = await Invoice.findOneAndUpdate({ _id: id }, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedInvoice) {
      throw new ApiError(Errors.InvoiceNotFound);
    }

    return updatedInvoice;
  }

  async deleteInvoice(id: string) {
    const deletedInvoice = await Invoice.deleteOne({ _id: id });

    if (!deletedInvoice) {
      throw new ApiError(Errors.InvoiceNotFound);
    }

    return deletedInvoice;
  }
}

export default new InvoiceService();
