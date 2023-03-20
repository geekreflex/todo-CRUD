import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { respond, ResponseCode } from '../../../utils/response';

const jwtSecret = process.env.JWT_SECRET as string;

class JwtMiddleware {
  validJWTNeeded(req: Request, res: Response, next: NextFunction) {
    if (req.headers['authorization']) {
      try {
        const authorization = req.headers['authorization'].split(' ');
        if (authorization[0] !== 'Bearer') {
          respond(res, {}, 'Unauthorized', ResponseCode.UNAUTHORIZED);
        } else {
          res.locals.jwt = jwt.verify(authorization[1], jwtSecret);
          next();
        }
      } catch (error) {
        respond(res, {}, 'Forbidden', ResponseCode.FORBIDDEN);
      }
    } else {
      respond(res, {}, 'Unauthorized', ResponseCode.UNAUTHORIZED);
    }
  }
}

export default new JwtMiddleware();
