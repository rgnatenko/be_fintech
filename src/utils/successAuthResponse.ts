import UserDto from '../dtos/user.dto';
import { IUser } from '../models/user.model';
import TokenService from '../services/token.service';

export default async function successAuthResponse(user: IUser) {
  const userDto = new UserDto(user);
  const tokens = TokenService.generateTokens({ ...userDto });
  await TokenService.saveToken(userDto.id, tokens.refreshToken);

  return { ...tokens, user: userDto };
}
