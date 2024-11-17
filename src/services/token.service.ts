import jwt from 'jsonwebtoken';
import Token from '../models/token.model';

class TokenService {
  generateTokens(payload: any) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET || '', {
      expiresIn: '1h',
    });
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET || '',
      {
        expiresIn: '30d',
      },
    );

    return { accessToken, refreshToken };
  }

  async saveToken(userId: string, refreshToken: string) {
    const token = await Token.findOne({ user: userId });

    if (token) {
      token.refreshToken = refreshToken;
      return token.save();
    }

    const newToken = await Token.create({ user: userId, refreshToken });
    return newToken;
  }

  async removeToken(refreshToken: string) {
    const token = await Token.deleteOne({ refreshToken });
    return token;
  }

  async findToken(refreshToken: string) {
    const token = await Token.findOne({ refreshToken });
    return token;
  }

  async validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET || '');
      return userData;
    } catch (e) {
      return null;
    }
  }

  async validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET || '');
      return userData;
    } catch (e) {
      return null;
    }
  }


}

export default new TokenService();
