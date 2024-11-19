import * as Yup from 'yup';
import { Request, Response, NextFunction } from 'express';

const validateInput =
  (schema: Yup.ObjectSchema<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      return next();
    } catch (e) {
      next(e);
    }
  };

export default validateInput;
