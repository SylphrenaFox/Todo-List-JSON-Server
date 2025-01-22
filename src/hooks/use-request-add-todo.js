import { useState } from 'react';

export const useRequestAddTodo = (todos, setTodos) => {
	const [isCreating, setIsCreating] = useState(false);

	const requestAddTodo = (todoItem) => {
		setIsCreating(true);

		fetch('http://localhost:3003/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				id: Date.now(),
				title: todoItem,
				completed: false,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((newTodo) => {
				setTodos((prevTodos) => [...prevTodos, newTodo]);
			})
			.finally(() => setIsCreating(false));
	};
	return { requestAddTodo, isCreating };
};
