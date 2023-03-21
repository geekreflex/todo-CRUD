import mongooseService from '../../common/services/mongoose.service';
import debug from 'debug';
import { CreateTodoDto, UpdateTodoDto } from '../dtos/todo.dto';

const log: debug.IDebugger = debug('app:todo-dao');

class TodoDao {
  mongoose = mongooseService.getMongoose();
  Schema = this.mongoose.Schema;

  todoSchema = new this.Schema(
    {
      content: { type: String, required: true },
      completed: { type: Boolean, required: true, default: false },
      user: {
        type: this.mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    },
    { timestamps: true }
  );

  Todo = this.mongoose.model('Todo', this.todoSchema);

  constructor() {
    log('Created new instance of TodoDao');
  }

  async createTodo(todoFields: CreateTodoDto) {
    const todo = new this.Todo({
      ...todoFields,
    });
    await todo.save();
    return todo.id;
  }

  async getTodos(userId: string) {
    return await this.Todo.find({ user: userId })
      .sort({ createdAt: -1 })
      .exec();
  }

  async getTodoById(todoId: string) {
    return await this.Todo.findOne({ _id: todoId }).exec();
  }

  async deleteTodoById(todoId: string) {
    return await this.Todo.findOneAndDelete({ _id: todoId }).exec();
  }

  async updateTodoById(
    todoId: string,
    userId: string,
    todoFields: UpdateTodoDto
  ) {
    const existingTodo = await this.Todo.findOneAndUpdate(
      { _id: todoId, user: userId },
      { $set: todoFields },
      { new: true }
    ).exec();

    return existingTodo;
  }
}

export default new TodoDao();
