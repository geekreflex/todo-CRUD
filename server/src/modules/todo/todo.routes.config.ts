import { Router } from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import jwtMiddleware from '../common/middleware/jwt.middleware';
import validateResource from '../common/middleware/validate.resource.middleware';
import todoController from './controller/todo.controller';
import todoMiddleware from './middleware/todo.middleware';
import { CreateTodoSchema } from './schema/todo.schema';

export class TodoRoutes extends CommonRoutesConfig {
  constructor() {
    super('TodoRoutes');
  }

  configureRoutes(): Router {
    this.router
      .route(`/`)
      .all(jwtMiddleware.validJWTNeeded)
      .get(todoController.getTodos)
      .post(validateResource(CreateTodoSchema), todoController.createTodo);

    this.router
      .route(`/:todoId`)
      .all(
        jwtMiddleware.validJWTNeeded,
        todoMiddleware.validateTodoExist,
        todoMiddleware.checkIfUserTodo
      )
      .put(validateResource(CreateTodoSchema), todoController.updateTodo)
      .delete(todoController.deleteTodo);
    return this.router;
  }
}
