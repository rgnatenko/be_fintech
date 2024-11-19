import UserDto from '../dtos/user.dto';
import ApiError from '../exceptions/api-error';
import { Errors } from '../exceptions/errors';
import logger from '../exceptions/logger';
import { IUser } from '../models/user.model';
import TokenService from '../services/token.service';

export default async function successAuthResponse(user: IUser) {
  try {
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  } catch (e) {
    logger.error(e);
    throw new ApiError(Errors.FailedToGenerateToken);
  }
}
