import { IUser } from '../models/user.model';

class UserDto {
  email: string;
  id: string;
  username: string;
  isActivated: boolean;

  constructor(user: Partial<UserDto>) {
    this.email = user.email || '';
    this.id = user.id || '';
    this.isActivated = user.isActivated || false;
    this.username = user.username || '';
  }
}

export default UserDto;
