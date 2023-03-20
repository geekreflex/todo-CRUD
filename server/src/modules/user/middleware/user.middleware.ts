import { Request, Response, NextFunction } from 'express';
import argon2 from 'argon2';
import userDao from '../dao/user.dao';
import debug from 'debug';
import { respond, ResponseCode } from '../../../utils/response';

const log: debug.IDebugger = debug('app:user-middleware');

class UserMiddleware {
  async verifyUserPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const user: any = await userDao.getUserByEmail(req.body.email);
      if (user) {
        const passwordHash = user.password;
        if (await argon2.verify(passwordHash, req.body.password)) {
          req.body = {
            userId: user.id,
            email: user.email,
          };
          return next();
        } else {
          respond(
            res,
            {},
            'Invalid email or password',
            ResponseCode.BAD_REQUEST
          );
        }
      }
    } catch (error) {
      log('Error', error);
      respond(res, {}, '', ResponseCode.INTERNAL_SERVER_ERROR);
    }
  }

  async checkEmailTaken(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userDao.getUserByEmail(req.body.email);
      if (user) {
        respond(res, {}, 'User email already exists', ResponseCode.BAD_REQUEST);
      } else {
        next();
      }
    } catch (error) {
      respond(res, {}, '', ResponseCode.INTERNAL_SERVER_ERROR);
    }
  }
}

export default new UserMiddleware();
