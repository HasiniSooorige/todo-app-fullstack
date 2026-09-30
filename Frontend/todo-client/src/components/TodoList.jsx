import TodoItem from "./TodoItem";

function TodoList({ todos, onToggle, onDelete, onEdit }) {
    return (
        <div>
            {todos.length === 0 ? (
                <p>No todos found.</p>
            ) : (
                todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={onToggle}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                ))
            )}
        </div>
    );
}

export default TodoList;