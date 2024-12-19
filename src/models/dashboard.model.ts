import mongoose from 'mongoose';

export interface IDashboardRevenue {
  amount: number;
  date: NativeDate;
  source: string;
}

export interface IDashboardReceivable {
  amount: number;
  client: string;
  dueDate: NativeDate;
  status: 'Pending' | 'Paid' | 'Error';
}

export interface IDashboardExpense {
  amount: number;
  date: NativeDate;
  category:
    | 'TransferBetweenCards'
    | 'CashWithdrawn'
    | 'Food'
    | 'Taxes'
    | 'Rent';
  notes?: string | null | undefined;
}

export interface Dashboard {
  user: mongoose.Types.ObjectId;
  revenues: IDashboardRevenue[];
  receivables: IDashboardReceivable[];
  expenses: IDashboardExpense[];
}

const RevenuesSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  source: { type: mongoose.Types.ObjectId, required: true },
  date: { type: Date, default: Date.now(), required: true },
});

const ReceivablesSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  client: { type: mongoose.Types.ObjectId, required: true },
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
  date: { type: Date, default: Date.now(), required: true },
  notes: { type: String },
});

const DashboardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    revenues: [RevenuesSchema],
    receivables: [ReceivablesSchema],
    expenses: [ExpensesSchema],
  },
  { timestamps: true },
);

export default mongoose.model<Dashboard>('Dashboard', DashboardSchema);
