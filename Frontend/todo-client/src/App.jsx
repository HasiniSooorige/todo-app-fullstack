import { useEffect, useState } from "react";
import {
    getTodos,
    createTodo,
    updateTodo,
    toggleTodo,
    deleteTodo
} from "./services/todoService";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

import "./App.css";

function App() {
    const [todos, setTodos] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");

    const [editingTodo, setEditingTodo] = useState(null);

    // -----------------------------
    // Load Todos
    // -----------------------------
    const loadTodos = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getTodos();
            setTodos(data);
        } catch (error) {
            console.error("Failed to load todos:", error);
            setError("Failed to load todos. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadTodos();
    }, []);

    // -----------------------------
    // Create Todo
    // -----------------------------
    const handleCreateTodo = async (todo) => {
        try {
            setError("");

            const createdTodo = await createTodo(todo);

            setTodos((previousTodos) => [
                ...previousTodos,
                createdTodo
            ]);
        } catch (error) {
            console.error("Failed to create todo:", error);
            setError("Failed to create todo. Please try again.");
        }
    };

    // -----------------------------
    // Update Todo
    // -----------------------------
    const handleUpdateTodo = async (todo) => {
        try {
            setError("");

            const updatedTodo = await updateTodo(todo.id, {
                title: todo.title,
                description: todo.description
            });

            setTodos((previousTodos) =>
                previousTodos.map((item) =>
                    item.id === todo.id ? updatedTodo : item
                )
            );

            setEditingTodo(null);
        } catch (error) {
            console.error("Failed to update todo:", error);
            setError("Failed to update todo. Please try again.");
        }
    };

    // -----------------------------
    // Toggle Todo
    // -----------------------------
    const handleToggleTodo = async (id) => {
        try {
            setError("");

            await toggleTodo(id);

            setTodos((previousTodos) =>
                previousTodos.map((todo) =>
                    todo.id === id
                        ? { ...todo, done: !todo.done }
                        : todo
                )
            );
        } catch (error) {
            console.error("Failed to update todo status:", error);
            setError("Failed to update todo status. Please try again.");
        }
    };

    // -----------------------------
    // Delete Todo
    // -----------------------------
    const handleDeleteTodo = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this todo?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");

            await deleteTodo(id);

            setTodos((previousTodos) =>
                previousTodos.filter((todo) => todo.id !== id)
            );
        } catch (error) {
            console.error("Failed to delete todo:", error);
            setError("Failed to delete todo. Please try again.");
        }
    };

    // -----------------------------
    // Search + Filter
    // -----------------------------
    const filteredTodos = todos.filter((todo) => {
        const search = searchTerm.toLowerCase();

        const matchesSearch =
            todo.title.toLowerCase().includes(search) ||
            todo.description.toLowerCase().includes(search);

        const matchesFilter =
            filter === "all" ||
            (filter === "pending" && !todo.done) ||
            (filter === "completed" && todo.done);

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="app-container">

            <header className="app-header">
                <h1>Todo App</h1>
                <p>React + .NET Full Stack Todo Application</p>
            </header>

            <main className="app-content">

                {/* Error Message */}
                {error && (
                    <div className="error-message">
                        <span>{error}</span>

                        <button onClick={loadTodos}>
                            Retry
                        </button>
                    </div>
                )}

                {/* Add / Edit Form */}
                <TodoForm
                    onCreate={handleCreateTodo}
                    onUpdate={handleUpdateTodo}
                    editingTodo={editingTodo}
                    onCancelEdit={() => setEditingTodo(null)}
                />

                {/* Search & Filter */}
                <div className="filter-section">

                    <input
                        type="text"
                        placeholder="Search todos..."
                        value={searchTerm}
                        onChange={(event) =>
                            setSearchTerm(event.target.value)
                        }
                        className="search-input"
                    />

                    <select
                        value={filter}
                        onChange={(event) =>
                            setFilter(event.target.value)
                        }
                        className="filter-select"
                    >
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>

                </div>

                {/* Todo Count */}
                {!loading && todos.length > 0 && (
                    <div className="todo-count">
                        Showing {filteredTodos.length} of {todos.length} todos
                    </div>
                )}

                {/* Loading */}
                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading todos...</p>
                    </div>
                ) : (
                    <TodoList
                        todos={filteredTodos}
                        onToggle={handleToggleTodo}
                        onEdit={setEditingTodo}
                        onDelete={handleDeleteTodo}
                    />
                )}

            </main>
        </div>
    );
}

export default App;