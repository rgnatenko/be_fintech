import { Response } from 'express';
import { IUser } from '../models/user.model';

export default function setRefreshTokenToCookie(res: Response, refreshToken: string) {
  const cookieMaxAge = 30 * 24 * 60 * 60 * 1000;

  res.cookie('refreshToken', refreshToken, {
    maxAge: cookieMaxAge,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
}
