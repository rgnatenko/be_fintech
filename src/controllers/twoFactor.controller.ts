import { Request, Response, NextFunction } from 'express';
import TwoFactorService from '../services/twoFactor.service';

class TwoFactorController {
  async request2FACode(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, phoneNumber } = req.body;
      await TwoFactorService.send2FACode(userId, phoneNumber);
      res.json({ message: '2FA code sent successfully.' });
    } catch (e) {
      next(e);
    }
  }

  async verify2FACode(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, code } = req.body;
      await TwoFactorService.verify2FACode(userId, code);
      res.json({ message: '2FA verification successful.' });
    } catch (e) {
      next(e);
    }
  }
}

export default new TwoFactorController();
