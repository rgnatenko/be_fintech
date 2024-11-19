import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/error-middleware';
import UserRouter from './routes/user.router';
import TwoFactorRouter from './routes/2fa.routes';

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
