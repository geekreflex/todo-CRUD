import mongooseService from '../../common/services/mongoose.service';
import debug from 'debug';
import { CreateTodoDto } from '../dtos/todo.dto';

const log: debug.IDebugger = debug('app:todo-dao');

class TodoDao {
  mongoose = mongooseService.getMongoose();
  Schema = this.mongoose.Schema;

  todoSchema = new this.Schema(
    {
      content: { type: String, required: true },
      userId: { type: this.mongoose.Types.ObjectId, ref: 'User' },
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

  async getTodoById(todoId: string) {
    return await this.Todo.findById(todoId);
  }
}

export default new TodoDao();
