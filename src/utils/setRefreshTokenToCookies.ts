import { Response } from 'express';
import { IUser } from '../models/user.model';

export default function setRefreshTokenToCookie(res: Response, user: any) {
  const cookieMaxAge = 30 * 24 * 60 * 60 * 1000;

  res.cookie('refreshToken', user.refreshToken, {
    maxAge: cookieMaxAge,
    httpOnly: true,
    sameSite: 'lax',
    // secure: true
  });
}
