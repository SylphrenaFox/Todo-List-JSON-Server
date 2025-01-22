import React from 'react';
import { useState } from 'react';
import styles from './App.module.css';
import { debounce } from './utils/debounce';
import {
	useRequestGetTodos,
	useRequestAddTodo,
	useRequestUpdateTodo,
	useRequestDeleteTodo,
} from './hooks';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [todoItem, setTodoItem] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [isSortTurnedOn, setIsSortTurnedOn] = useState(false);

	const { isLoading } = useRequestGetTodos(todos, setTodos);
	const { requestAddTodo, isCreating } = useRequestAddTodo(todos, setTodos);
	const { requestUpdateTodo, isUpdating } = useRequestUpdateTodo(todos, setTodos);
	const { requestDeleteTodo, isDeleting } = useRequestDeleteTodo(todos, setTodos);

	const handleSubmitButton = (event) => {
		event.preventDefault();
		requestAddTodo(todoItem);
		setTodoItem('');
	};

	const filteredTodos = todos.filter((todo) =>
		todo.title?.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	const debouncedSearchChange = debounce((value) => {
		setSearchQuery(value);
	}, 250);

	const handleSearchChange = ({ target }) => {
		debouncedSearchChange(target.value);
	};
	const sortedTodos = isSortTurnedOn
		? [...filteredTodos].sort((a, b) => a.title.localeCompare(b.title))
		: filteredTodos;

	return (
		<div className={styles.app}>
			<button
				className={styles.sortButton}
				onClick={() => setIsSortTurnedOn(!isSortTurnedOn)}
			>
				{isSortTurnedOn ? 'Отменить сортировку' : 'Сортировать'}
			</button>
			<form onSubmit={handleSubmitButton}>
				<input
					className={styles.todoInput}
					type="text"
					value={todoItem}
					placeholder="Введите задачу"
					onChange={({ target }) => setTodoItem(target.value)}
				/>
				<button
					type="submit"
					className={styles.submitButton}
					disabled={isCreating}
				>
					Создать задачу
				</button>
			</form>
			<input
				type="text"
				className={styles.searchInput}
				placeholder="Поиск задачи"
				value={searchQuery}
				onChange={handleSearchChange}
			/>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				sortedTodos.map(({ id, title, completed }) => (
					<div key={id} className={styles.todoItem}>
						{title}
						<button
							onClick={() => requestUpdateTodo(id, completed)}
							className={styles.updateButton}
							disabled={isUpdating}
						>
							{completed ? '✅' : '❌'}
						</button>
						<button
							className={styles.deleteButton}
							disabled={isDeleting}
							id={id}
							onClick={() => requestDeleteTodo(id)}
						>
							Удалить
						</button>
					</div>
				))
			)}
		</div>
	);
};
