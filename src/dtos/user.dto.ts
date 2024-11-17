import { IUser } from '../models/user.model';

class UserDto {
  email: string;
  id: string;
  isActivated: boolean;

  constructor({ email, id, isActivated }: IUser) {
    this.email = email;
    this.id = id;
    this.isActivated = isActivated;
  }
}

export default UserDto;
