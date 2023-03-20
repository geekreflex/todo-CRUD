import { Request, Response } from 'express';
import { respond } from '../../../utils/response';
import todoDao from '../dao/todo.dao';

class TodoController {
  async createTodo(req: Request, res: Response) {
    const userId = res.locals.jwt.userId;
    const data = {
      content: req.body.content,
      userId,
    };
    const todoId = await todoDao.createTodo(data);
    respond(res, { id: todoId }, 'Todo created');
  }
}

export default new TodoController();
