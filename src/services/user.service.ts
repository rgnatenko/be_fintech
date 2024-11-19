import User from '../models/user.model';
import bcrypt from 'bcrypt';
// import uuid from 'uuid';
import MailService from './mail.service';
import TokenService from './token.service';
import UserDto from '../dtos/user.dto';
import ApiError from '../exceptions/api-error';
import { Errors } from '../exceptions/errors';
import successAuthResponse from '../utils/successAuthResponse';
import { randomUUID } from 'crypto';

class UserService {
  async register(email: string, password: string, username: string) {
    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      throw new ApiError(Errors.RegistrationError);
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = randomUUID();
    // const normalizedEmail = email.trim().toLowerCase();

    const user = await User.create({
      username,
      email,
      password: hashPassword,
      activationLink,
    });

    await MailService.sendActivationMail(
      email,
      `${process.env.API_URL}/auth/activate/${activationLink}`,
    );
    const userDto = new UserDto(user);

    return successAuthResponse(user);
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(Errors.UserNotFound);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new ApiError(Errors.WrongPassword);
    }

    return successAuthResponse(user);
  }

  async logout(refreshToken: string) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  async activate(activationLink: string) {
    const user = await User.findOne({ activationLink });

    if (!user) {
      throw new ApiError(Errors.IncorrectActivationLink);
    }

    user.isActivated = true;
    await user.save();
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new ApiError(Errors.Unauthorized);
    }

    const userData = await TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw new ApiError(Errors.IncorrectToken);
    }

    const user = await User.findById((userData as any).id);
    return successAuthResponse(user as any);
  }
}

export default new UserService();
