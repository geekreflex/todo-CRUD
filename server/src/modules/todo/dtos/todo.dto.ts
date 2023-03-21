export interface CreateTodoDto {
  content: string;
  completed: boolean;
  user: string;
}

export interface UpdateTodoDto {
  content: string;
  completed: false;
}
