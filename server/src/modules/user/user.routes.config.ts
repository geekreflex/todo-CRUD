import { Router } from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import validateResource from '../common/middleware/validate.resource.middleware';
import userController from './controllers/user.controller';
import userMiddleware from './middleware/user.middleware';
import { CreateUserSchema } from './schema/user.schema';

export class UserRoutes extends CommonRoutesConfig {
  constructor() {
    super('UserRoutes');
  }

  configureRoutes(): Router {
    this.router.post(
      '/login',
      userMiddleware.verifyUserPassword,
      userController.authUser
    );
    this.router.post(
      `/register`,
      validateResource(CreateUserSchema),
      userMiddleware.checkEmailTaken,
      userController.createUser
    );
    return this.router;
  }
}
