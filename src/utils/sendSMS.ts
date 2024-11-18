import { Vonage } from '@vonage/server-sdk';
import { Auth } from '@vonage/auth';
import ApiError from '../exceptions/api-error';
import { Errors } from '../exceptions/errors';
import logger from '../exceptions/logger';

const credentials = new Auth({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
});

const vonage = new Vonage(credentials, {});

export default async function sendSMS(phoneNumber: string, message: string) {
  try {
    await vonage.sms.send({
      to: phoneNumber,
      from: process.env.VONAGE_FROM || '',
      text: message,
    });
  } catch (e) {
    logger.error(e);
    throw new ApiError(Errors.FailedToSendSMS);
  }
}
