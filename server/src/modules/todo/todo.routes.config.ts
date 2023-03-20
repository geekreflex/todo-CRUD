import { Router } from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import jwtMiddleware from '../common/middleware/jwt.middleware';
import validateResource from '../common/middleware/validate.resource.middleware';
import todoController from './controller/todo.controller';
import { CreateTodoSchema } from './schema/todo.schema';

export class TodoRoutes extends CommonRoutesConfig {
  constructor() {
    super('TodoRoutes');
  }

  configureRoutes(): Router {
    this.router
      .route(`/`)
      .all(jwtMiddleware.validJWTNeeded)
      .post(validateResource(CreateTodoSchema), todoController.createTodo);
    return this.router;
  }
}
