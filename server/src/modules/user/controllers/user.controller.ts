import { Request, Response } from 'express';
import argon2 from 'argon2';
import userDao from '../dao/user.dao';
import { generateToken } from '../../../utils/generate';
import { respond, ResponseCode } from '../../../utils/response';

class UserController {
  async authUser(req: Request, res: Response) {
    try {
      const token = await generateToken(req.body.userId);
      const user = await userDao.getUserById(req.body.userId);
      respond(res, { user, token }, 'Logged In');
    } catch (error) {
      respond(res, {}, '', ResponseCode.INTERNAL_SERVER_ERROR);
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      req.body.password = await argon2.hash(req.body.password);
      const userId = await userDao.createUser(req.body);
      const user = await userDao.getUserById(userId);
      const token = await generateToken(userId);
      respond(res, { user, token }, 'User created', ResponseCode.CREATED);
    } catch (error) {
      respond(res, {}, '', ResponseCode.INTERNAL_SERVER_ERROR);
    }
  }
}

export default new UserController();
