function TodoItem({
    todo,
    onToggle,
    onEdit,
    onDelete
}) {
    return (
        <div
            className={`todo-card ${todo.done ? "todo-completed" : ""
                }`}
        >

            <div className="todo-info">

                <h3 className={todo.done ? "completed-title" : ""}>
                    {todo.title}
                </h3>

                <p className="todo-description">
                    {todo.description || "No description"}
                </p>

                <span
                    className={`status-badge ${todo.done
                            ? "status-completed"
                            : "status-pending"
                        }`}
                >
                    {todo.done ? "Completed" : "Pending"}
                </span>

            </div>

            <div className="todo-actions">

                <button
                    className="btn btn-success"
                    onClick={() => onToggle(todo.id)}
                >
                    {todo.done ? "Mark Pending" : "Mark Done"}
                </button>

                <button
                    className="btn btn-warning"
                    onClick={() => onEdit(todo)}
                >
                    Edit
                </button>

                <button
                    className="btn btn-danger"
                    onClick={() => onDelete(todo.id)}
                >
                    Delete
                </button>

            </div>

        </div>
    );
}

export default TodoItem;