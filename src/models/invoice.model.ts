import mongoose, { Schema, Document } from 'mongoose';

export type InvoiceStatus = 'UNPAID' | 'PAID' | 'OVERDUE';

export interface IInvoice {
  userId: mongoose.Types.ObjectId | string;
  invoiceNumber: string;
  client: mongoose.Types.ObjectId | string;
  amount: number;
  dueDate: Date;
  status: InvoiceStatus;
}

const InvoiceSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  invoiceNumber: { type: String, required: true, unique: true, trim: true },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: [0, 'Amount must be a positive'],
  },
  dueDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ['UNPAID', 'PAID', 'OVERDUE'],
    default: 'UNPAID',
    required: true,
  },
});

export default mongoose.model<IInvoice>('Invoice', InvoiceSchema);
