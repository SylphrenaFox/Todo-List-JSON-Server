import { useEffect, useState } from 'react';

export const useRequestGetTodos = (todos, setTodos) => {
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		fetch('http://localhost:3003/todos')
			.then((response) => response.json())
			.then((data) => {
				setTodos(data);
			})
			.finally(() => setIsLoading(false));
	}, []);

	return {
		isLoading,
	};
};
