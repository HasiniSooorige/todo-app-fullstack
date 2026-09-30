function TodoItem({
    todo,
    onToggle,
    onEdit,
    onDelete,
    actionLoading
}) {
    return (
        <div className={`todo-item ${todo.done ? "completed" : ""}`}>

            <div className="todo-content">

                <h3>{todo.title}</h3>

                <p>{todo.description}</p>

                <span className={`status ${todo.done ? "done" : "pending"}`}>
                    {todo.done ? "Completed" : "Pending"}
                </span>

            </div>

            <div className="todo-actions">

                <button
                    onClick={() => onToggle(todo.id)}
                    disabled={actionLoading}
                    className="success-button"
                >
                    {actionLoading
                        ? "..."
                        : todo.done
                            ? "Mark Pending"
                            : "Mark Done"
                    }
                </button>

                <button
                    onClick={() => onEdit(todo)}
                    disabled={actionLoading}
                    className="edit-button"
                >
                    Edit
                </button>

                <button
                    onClick={() => onDelete(todo.id)}
                    disabled={actionLoading}
                    className="delete-button"
                >
                    Delete
                </button>

            </div>

        </div>
    );
}

export default TodoItem;