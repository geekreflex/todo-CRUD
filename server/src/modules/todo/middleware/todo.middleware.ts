import { Request, Response, NextFunction } from 'express';
import todoDao from '../dao/todo.dao';
import debug from 'debug';
import { respond, ResponseCode } from '../../../utils/response';

const log: debug.IDebugger = debug('app:user-middleware');

class TodoMiddleware {
  async validateTodoExist(req: Request, res: Response, next: NextFunction) {
    try {
      const todo = await todoDao.getTodoById(req.params.todoId);
      if (todo) {
        res.locals.todo = todo;
        next();
      } else {
        res;
        respond(res, {}, 'Todo not found', ResponseCode.NOT_FOUND);
      }
    } catch (error) {
      log('Error', error);
      respond(res, {}, '', ResponseCode.INTERNAL_SERVER_ERROR);
    }
  }

  async checkIfUserTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.jwt.userId;
      const todo = res.locals.todo;

      if (userId === todo.user.toString()) {
        next();
      } else {
        respond(res, {}, '', ResponseCode.FORBIDDEN);
      }
    } catch (error) {
      log('Error', error);
      respond(res, {}, '', ResponseCode.INTERNAL_SERVER_ERROR);
    }
  }
}

export default new TodoMiddleware();
