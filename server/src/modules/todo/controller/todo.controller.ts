import { Request, Response } from 'express';
import { respond } from '../../../utils/response';
import todoDao from '../dao/todo.dao';

class TodoController {
  async createTodo(req: Request, res: Response) {
    const userId = res.locals.jwt.userId;
    const data = {
      content: req.body.content,
      completed: false,
      user: userId,
    };
    const todoId = await todoDao.createTodo(data);
    respond(res, { id: todoId }, 'Todo created');
  }

  async getTodos(req: Request, res: Response) {
    const userId = res.locals.jwt.userId;
    const todos = await todoDao.getTodos(userId);
    respond(res, { todos }, 'Retrived todos');
  }

  async updateTodo(req: Request, res: Response) {
    const { content, completed } = req.body;
    const todoId = req.params.todoId;
    const userId = res.locals.jwt.userId;
    const todo = await todoDao.updateTodoById(todoId, userId, {
      content,
      completed,
    });
    respond(res, { todo }, 'Todo updated');
  }

  async deleteTodo(req: Request, res: Response) {
    const todoId = req.params.todoId;
    await todoDao.deleteTodoById(todoId);
    respond(res, {}, 'Todo deleted');
  }
}

export default new TodoController();
