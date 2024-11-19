import rateLimit from 'express-rate-limit';
import ApiError from '../exceptions/api-error';
import { Errors } from '../exceptions/errors';

const rateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 5,
  message: new ApiError(Errors.RateLimit),
  standardHeaders: true,
  legacyHeaders: false,
});

export default rateLimiter;
