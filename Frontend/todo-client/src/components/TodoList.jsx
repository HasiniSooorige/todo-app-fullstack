import TodoItem from "./TodoItem";

function TodoList({
    todos,
    onToggle,
    onEdit,
    onDelete
}) {
    if (todos.length === 0) {
        return (
            <div className="empty-state">

                <div className="empty-icon">
                    ✓
                </div>

                <h3>No todos found</h3>

                <p>
                    Try adding a new todo or changing your search/filter.
                </p>

            </div>
        );
    }

    return (
        <div className="todo-list">

            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}

        </div>
    );
}

export default TodoList;