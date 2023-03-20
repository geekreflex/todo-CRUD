import { Router } from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import userController from './controllers/user.controller';

export class UserRoutes extends CommonRoutesConfig {
  constructor() {
    super('UserRoutes');
  }

  configureRoutes(): Router {
    this.router.route(`/`).post(userController.createUser);
    return this.router;
  }
}
