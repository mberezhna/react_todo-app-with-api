import React, { useContext, useEffect, useRef } from 'react';
import cn from 'classnames';

import { AppContext } from '../AppContext';
import { ErrorType } from '../types/Errors';

type Props = {
  isEveryTodosCompleted: boolean
};

export const Header: React.FC<Props> = (props) => {
  const { isEveryTodosCompleted } = props;
  const {
    todos,
    todoTitle,
    setTodoTitle,
    shouError,
    isLoading,
    createNewTodo,
    toggleAllTodos,
  } = useContext(AppContext);

  const todoTitleRef = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    if (todoTitleRef.current) {
      todoTitleRef.current.focus();
    }
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (!todoTitle.trim()) {
      shouError(ErrorType.TitleIsEmpty);

      return;
    }

    createNewTodo(todoTitle.trim());
  };

  return (
    <header className="todoapp__header">
      {!isLoading && todos.length > 0 && (
        <button
          aria-label="Toggle All"
          type="button"
          className={cn(
            'todoapp__toggle-all',
            { active: isEveryTodosCompleted },
          )}
          data-cy="ToggleAllButton"
          onClick={toggleAllTodos}
        />
      )}

      <form
        onSubmit={handleSubmit}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={todoTitleRef}
          value={todoTitle}
          onChange={(event) => setTodoTitle(event.target.value)}
          disabled={isLoading}
        />
      </form>
    </header>
  );
};
