import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/error-middleware';
import UserRouter from './routes/user.router';
import TwoFactorRouter from './routes/2fa.routes';
import DashboardRouter from './routes/dashboard.routes';
import ProjectRouter from './routes/project.routes';
import ContractRouter from './routes/contract.routes';
import EmployeeRouter from './routes/employee.routes';
import TaskRouter from './routes/task.router';
import InvoiceRouter from './routes/invoice.routes';
import FinancialPlanRouter from './routes/financialPlan.routes';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  }),
);

app.use('/auth', UserRouter);
app.use('/2fa', TwoFactorRouter);
app.use('/dashboard', DashboardRouter);
app.use('/projects', ProjectRouter);
app.use('/contracts', ContractRouter);
app.use('/invoices', InvoiceRouter);
app.use('/employees', EmployeeRouter);
app.use('/tasks', TaskRouter);
app.use('/financial-plans', FinancialPlanRouter);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    errorMiddleware(err, req, res, next);
  },
);

export default app;
