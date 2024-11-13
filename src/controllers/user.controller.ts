import { Request, Response } from 'express';
import UserService from '../services/user.servise';

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const userData = req.body;

      const user = await UserService.createUser(userData);
      res.status(201).json(user);
    } catch (e: any) {
      throw new e();
    }
  }
}

export default new UserController();
