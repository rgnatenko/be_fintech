import User from '../models/user.model';

class UserService {
  async createUser(body: any) {
    const newUser = await User.create(body);

    return newUser;
  }
}

export default new UserService();
