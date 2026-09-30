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

import "./App.css";

function App() {

    const [todos, setTodos] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [searchTerm, setSearchTerm] = useState("");

    const [filter, setFilter] = useState("all");

    const [editingTodo, setEditingTodo] = useState(null);

    const [actionLoadingId, setActionLoadingId] = useState(null);


    // Load todos
    useEffect(() => {

        let cancelled = false;

        getTodos()
            .then((data) => {

                if (!cancelled) {
                    setTodos(data);
                    setError("");
                    setLoading(false);
                }

            })
            .catch((error) => {

                console.error(error);

                if (!cancelled) {
                    setError(
                        "Unable to load todos. Please make sure the API is running."
                    );

                    setLoading(false);
                }

            });

        return () => {
            cancelled = true;
        };

    }, []);


    // Add / Edit Todo
    const handleSubmit = async (todoData) => {

        try {

            setError("");

            if (editingTodo) {

                const updatedTodo = await updateTodo(
                    editingTodo.id,
                    todoData
                );

                setTodos((currentTodos) =>
                    currentTodos.map((todo) =>
                        todo.id === editingTodo.id
                            ? updatedTodo
                            : todo
                    )
                );

                setEditingTodo(null);

            } else {

                const newTodo = await createTodo(todoData);

                setTodos((currentTodos) => [
                    ...currentTodos,
                    newTodo
                ]);

            }

        } catch (error) {

            console.error(error);

            setError(
                "Something went wrong while saving the todo."
            );

            throw error;
        }
    };


    // Toggle todo
    const handleToggle = async (id) => {

        try {

            setActionLoadingId(id);

            setError("");

            await toggleTodo(id);

            setTodos((currentTodos) =>
                currentTodos.map((todo) =>
                    todo.id === id
                        ? {
                            ...todo,
                            done: !todo.done
                        }
                        : todo
                )
            );

        } catch (error) {

            console.error(error);

            setError(
                "Failed to update todo status."
            );

        } finally {

            setActionLoadingId(null);
        }
    };


    // Edit todo
    const handleEdit = (todo) => {

        setEditingTodo(todo);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    // Delete todo
    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this todo?"
        );

        if (!confirmed) {
            return;
        }

        try {

            setActionLoadingId(id);

            setError("");

            await deleteTodo(id);

            setTodos((currentTodos) =>
                currentTodos.filter(
                    (todo) => todo.id !== id
                )
            );

            if (editingTodo?.id === id) {
                setEditingTodo(null);
            }

        } catch (error) {

            console.error(error);

            setError(
                "Failed to delete todo."
            );

        } finally {

            setActionLoadingId(null);
        }
    };


    // Cancel edit
    const handleCancelEdit = () => {
        setEditingTodo(null);
    };


    // Search + Filter
    const filteredTodos = todos.filter((todo) => {

        const matchesSearch =
            todo.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            todo.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        const matchesFilter =
            filter === "all" ||
            (filter === "completed" && todo.done) ||
            (filter === "pending" && !todo.done);

        return matchesSearch && matchesFilter;
    });


    return (
        <div className="app">

            <header className="app-header">

                <h1>Todo App</h1>

                <p>
                    React + .NET Full Stack Todo Application
                </p>

            </header>


            <main className="container">

                {/* Error */}
                {error && (
                    <div className="error-message">
                        <span>{error}</span>

                        <button
                            onClick={() => setError("")}
                        >
                            ×
                        </button>
                    </div>
                )}


                {/* Form */}
                <section className="form-card">

                    <h2>
                        {editingTodo
                            ? "Edit Todo"
                            : "Add New Todo"
                        }
                    </h2>

                    <TodoForm
                        onSubmit={handleSubmit}
                        editingTodo={editingTodo}
                        onCancelEdit={handleCancelEdit}
                    />

                </section>


                {/* Search & Filter */}
                <section className="toolbar">

                    <input
                        type="text"
                        placeholder="Search todos..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                        className="search-input"
                    />

                    <select
                        value={filter}
                        onChange={(e) =>
                            setFilter(e.target.value)
                        }
                        className="filter-select"
                    >
                        <option value="all">
                            All
                        </option>

                        <option value="pending">
                            Pending
                        </option>

                        <option value="completed">
                            Completed
                        </option>
                    </select>

                </section>


                {/* Todo count */}
                <div className="todo-summary">

                    <span>
                        Showing {filteredTodos.length} of {todos.length} todos
                    </span>

                </div>


                {/* Loading */}
                {loading ? (

                    <div className="loading">
                        <div className="spinner"></div>
                        <p>Loading todos...</p>
                    </div>

                ) : (

                    <TodoList
                        todos={filteredTodos}
                        onToggle={handleToggle}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        actionLoadingId={actionLoadingId}
                    />

                )}

            </main>

        </div>
    );
}

export default App;