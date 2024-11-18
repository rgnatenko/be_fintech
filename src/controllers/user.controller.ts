import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user.service';
import setRefreshTokenToCookie from '../utils/setRefreshTokenToCookies';
import ApiError from '../exceptions/api-error';
import { Errors } from '../exceptions/errors';

class UserController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, username } = req.body;
      const user = await UserService.register(email, password, username);

      setRefreshTokenToCookie(res, user.refreshToken);

      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await UserService.login(email, password);

      setRefreshTokenToCookie(res, user.refreshToken);

      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;

      if (!refreshToken) {
        throw new ApiError(Errors.Unauthorized);
      }

      const token = await UserService.logout(refreshToken);

      if (!token) {
        throw new ApiError(Errors.Unauthorized);
      }

      res.clearCookie('refreshToken');

      res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async activate(req: Request, res: Response, next: NextFunction) {
    try {
      const activationLink = req.params.link;

      await UserService.activate(activationLink);

      res.redirect(process.env.CLIENT_URL || '');
    } catch (e) {
      next(e);
      res.redirect(`${process.env.CLIENT_URL}/activation-failed`);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const { accessToken, refreshToken: newRefreshToken } =
        await UserService.refresh(refreshToken);

      setRefreshTokenToCookie(res, newRefreshToken);

      res.json({ accessToken });
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
