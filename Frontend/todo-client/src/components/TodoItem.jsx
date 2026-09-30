import { useState } from "react";

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);

    const handleSave = async () => {
        console.log("Save clicked");
        console.log("Todo ID:", todo.id);
        console.log("Title:", title);
        console.log("Description:", description);

        if (!title.trim()) {
            return;
        }

        try {
            await onEdit(todo.id, {
                title: title,
                description: description
            });

            setIsEditing(false);
        } catch (error) {
            console.error("Edit failed:", error);
        }
    };

    const handleCancel = () => {
        setTitle(todo.title);
        setDescription(todo.description);
        setIsEditing(false);
    };

    return (
        <div className="todo-item">

            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <button type="button" onClick={handleSave}>
                        Save
                    </button>

                    <button type="button" onClick={handleCancel}>
                        Cancel
                    </button>
                </>
            ) : (
                <>
                    <h3>{todo.title}</h3>

                    <p>{todo.description}</p>

                    <p>
                        Status: {todo.done ? "Completed" : "Pending"}
                    </p>

                    <button
                        type="button"
                        onClick={() => onToggle(todo.id)}
                    >
                        {todo.done ? "Mark Pending" : "Mark Done"}
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        onClick={() => onDelete(todo.id)}
                    >
                        Delete
                    </button>
                </>
            )}

        </div>
    );
}

export default TodoItem;