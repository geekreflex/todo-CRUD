import { Request, Response } from 'express';
import argon2 from 'argon2';
import userDao from '../dao/user.dao';
import { generateToken } from '../../../utils/generate';
import { respond, ResponseCode } from '../../../utils/response';

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      req.body.password = await argon2.hash(req.body.password);
      const userId = await userDao.createUser(req.body);
      const token = generateToken(userId);
      respond(res, token, 'User created');
    } catch (error) {
      respond(res, {}, '', ResponseCode.INTERNAL_SERVER_ERROR);
    }
  }
}

export default new UserController();
