import mongoose from 'mongoose';

export interface Dashboard {
  user: mongoose.Types.ObjectId;
  revenue: {
    amount: number;
    date: NativeDate;
    source: string;
  }[];
  receivables: {
    amount: number;
    client: string;
    dueDate: NativeDate;
    status: 'Pending' | 'Paid' | 'Error';
  }[];
  expenses: {
    amount: number;
    date: NativeDate;
    category: string;
    notes?: string | null | undefined;
  }[];
}

const RevenueSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  source: { type: String, required: true },
  date: { type: Date, required: true },
});

const ReceivablesSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  client: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Paid', 'Error'],
    default: 'Pending',
  },
});

const ExpensesSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  category: {
    type: String,
    enum: ['TransferBetweenCards', 'CashWithdrawn', 'Food', 'Taxes', 'Rent'],
  },
  date: { type: Date, required: true },
  notes: { type: String },
});

const DashboardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    revenue: [RevenueSchema],
    receivables: [ReceivablesSchema],
    expenses: [ExpensesSchema],
  },
  { timestamps: true },
);

export default mongoose.model<Dashboard>('Dashboard', DashboardSchema);
