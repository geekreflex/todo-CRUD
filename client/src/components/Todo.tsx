import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  IoTrashBin,
  IoPencilSharp,
  IoCheckboxOutline,
  IoCheckbox,
  IoCheckmarkDone,
} from 'react-icons/io5';
import {
  createTodo,
  deleteTodo,
  getTodos,
  upddateTodo,
} from '../feature/todoSlice';
import { TodoData } from '../types';

const Todo = () => {
  const dispatch = useAppDispatch();
  const [content, setContent] = useState('');
  const [editingTodo, setEditingTodo] = useState<null | TodoData>(null);
  const [editText, setEditText] = useState('');
  const { todos } = useAppSelector((state) => state.todo);

  const completedTodos = todos.filter((todo) => todo.completed);
  const otherTodos = todos.filter((todo) => !todo.completed);

  const filtered = [...completedTodos, ...otherTodos];

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  const handleCreateTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      content,
    };
    setContent('');
    await dispatch(createTodo(payload));
    await dispatch(getTodos());
  };

  const handleDeleteTodo = async (todoId: string) => {
    await dispatch(deleteTodo(todoId));
    await dispatch(getTodos());
  };

  const handleCheck = async (todo: TodoData) => {
    setEditingTodo(null);
    const payload = {
      _id: todo._id,
      content: todo.content,
      completed: !todo.completed,
    };
    await dispatch(upddateTodo(payload));
    await dispatch(getTodos());
  };

  const handleUpdateTodo = async () => {
    console.log('click');
    if (editText && editText === editingTodo?.content) {
      setEditingTodo(null);
      return;
    }

    if (editingTodo) {
      const payload = {
        _id: editingTodo._id,
        content: editText,
        completed: editingTodo.completed,
      };
      setEditingTodo(null);
      await dispatch(upddateTodo(payload));
      await dispatch(getTodos());
    }
  };

  const onEditing = (todo: TodoData, content: string) => {
    setEditingTodo(todo);
    setEditText(content);
  };

  return (
    <div className="todo-wrap">
      <div className="todo-main">
        <div className="todo-form-wrap">
          <form onSubmit={handleCreateTodo}>
            <input
              placeholder="Enter task name..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button className="btn">Add</button>
          </form>
        </div>
        <div className="todo-list-wrap">
          {filtered.map((todo, index) => (
            <div className="todo-item" key={todo._id}>
              <div className="todo-item-content">
                <button onClick={() => handleCheck(todo)}>
                  {todo.completed ? <IoCheckbox /> : <IoCheckboxOutline />}
                </button>
                {editingTodo?._id === todo._id ? (
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                ) : (
                  <p
                    title="Click to edit"
                    onClick={() => onEditing(todo, todo.content)}
                    className={todo.completed ? 'done' : ''}
                  >
                    {todo.content}
                  </p>
                )}
              </div>
              <div className="todo-item-btns">
                {!todo.completed &&
                  (editingTodo?._id !== todo._id ? (
                    <button
                      title="Edit"
                      onClick={() => {
                        onEditing(todo, todo.content);
                      }}
                    >
                      <IoPencilSharp />
                    </button>
                  ) : (
                    <button onClick={handleUpdateTodo}>
                      <IoCheckmarkDone />
                    </button>
                  ))}
                <button
                  title="Delete"
                  onClick={() => handleDeleteTodo(todo._id)}
                >
                  <IoTrashBin />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
