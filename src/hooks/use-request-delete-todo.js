import { useState } from 'react';

export const useRequestDeleteTodo = (todos, setTodos) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const requestDeleteTodo = (id) => {
		setIsDeleting(true);
		fetch(`http://localhost:3003/todos/${id}`, {
			method: 'DELETE',
		})
			.then(() =>
				setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id)),
			)
			.finally(() => setIsDeleting(false));
	};

	return { requestDeleteTodo, isDeleting };
};
