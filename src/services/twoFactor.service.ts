import ApiError from '../exceptions/api-error';
import { Errors } from '../exceptions/errors';
import TwoFactor from '../models/twoFactor.model';
import User from '../models/user.model';
import sendSMS from '../utils/sendSMS';

class TwoFactorService {
  async send2FACode(userId: string, phoneNumber: string) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(Errors.UserNotFound);
    }

    try {
      await TwoFactor.create({ userId, code, expiresAt });
      await sendSMS(phoneNumber, `Your 2FA code is: ${code}`);
    } catch (e) {
      console.error('Failed to send 2FA code:', e);
      throw new ApiError(Errors.FailedToSend2FA);
    }
  }

  async verify2FACode(userId: string, code: string) {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(Errors.UserNotFound);
    }

    const twoFactorRecord = await TwoFactor.findOne({ userId, code });

    if (!twoFactorRecord) {
      throw new ApiError(Errors.InvalidTWOFA);
    }

    if (twoFactorRecord.expiresAt < new Date()) {
      throw new ApiError(Errors.ExpiredTWOFA);
    }

    await TwoFactor.deleteOne({ _id: twoFactorRecord._id });
    return true;
  }
}

export default new TwoFactorService();
