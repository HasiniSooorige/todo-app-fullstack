import { useEffect, useState } from "react";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

import {
    getTodos,
    createTodo,
    updateTodo,
    toggleTodo,
    deleteTodo
} from "./services/todoService";

function App() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadTodos = async () => {
        try {
            setLoading(true);

            const data = await getTodos();

            setTodos(data);
        } catch (error) {
            console.error(error);
            setError("Failed to load todos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadTodos();
    }, []);

    const handleAdd = async (todo) => {
        try {
            const createdTodo = await createTodo(todo);

            setTodos((currentTodos) => [
                ...currentTodos,
                createdTodo
            ]);
        } catch (error) {
            console.error(error);
            setError("Failed to create todo");
        }
    };

    const handleToggle = async (id) => {
        try {
            await toggleTodo(id);

            setTodos((currentTodos) =>
                currentTodos.map((todo) =>
                    todo.id === id
                        ? { ...todo, done: !todo.done }
                        : todo
                )
            );
        } catch (error) {
            console.error(error);
            setError("Failed to update todo");
        }
    };

    const handleEdit = async (id, todo) => {
        try {
            console.log("handleEdit called:", id, todo);

            const updatedTodo = await updateTodo(id, todo);

            setTodos((currentTodos) =>
                currentTodos.map((item) =>
                    item.id === id
                        ? updatedTodo
                        : item
                )
            );
        } catch (error) {
            console.error("Failed to edit todo:", error);
            setError("Failed to update todo");
            throw error;
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTodo(id);

            setTodos((currentTodos) =>
                currentTodos.filter((todo) => todo.id !== id)
            );
        } catch (error) {
            console.error(error);
            setError("Failed to delete todo");
        }
    };

    return (
        <div className="app">
            <h1>Todo App</h1>

            <p>React + .NET Full Stack Todo Application</p>

            {error && (
                <p>{error}</p>
            )}

            <TodoForm onAdd={handleAdd} />

            {loading ? (
                <p>Loading todos...</p>
            ) : (
                    <TodoList
                        todos={todos}
                        onToggle={handleToggle}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
            )}
        </div>
    );
}

export default App;