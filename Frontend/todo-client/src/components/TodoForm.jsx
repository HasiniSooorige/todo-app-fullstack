import { useEffect, useState } from "react";

function TodoForm({
    onCreate,
    onUpdate,
    editingTodo,
    onCancelEdit
}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [validationError, setValidationError] = useState("");

    // When Edit button is clicked
    useEffect(() => {
        if (editingTodo) {
            setTitle(editingTodo.title);
            setDescription(editingTodo.description);
            setValidationError("");
        } else {
            setTitle("");
            setDescription("");
            setValidationError("");
        }
    }, [editingTodo]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // -----------------------------
        // Validation
        // -----------------------------
        if (!title.trim()) {
            setValidationError("Title is required.");
            return;
        }

        if (title.trim().length < 2) {
            setValidationError(
                "Title must contain at least 2 characters."
            );
            return;
        }

        setValidationError("");

        const todoData = {
            title: title.trim(),
            description: description.trim()
        };

        if (editingTodo) {
            await onUpdate({
                id: editingTodo.id,
                ...todoData
            });
        } else {
            await onCreate(todoData);
        }

        // Clear form after create
        if (!editingTodo) {
            setTitle("");
            setDescription("");
        }
    };

    return (
        <div className="todo-form-card">

            <h2>
                {editingTodo ? "Edit Todo" : "Add New Todo"}
            </h2>

            <form onSubmit={handleSubmit}>

                <div className="form-fields">

                    <div className="form-group">
                        <label>Title</label>

                        <input
                            type="text"
                            placeholder="Enter todo title"
                            value={title}
                            onChange={(event) => {
                                setTitle(event.target.value);
                                setValidationError("");
                            }}
                            className={
                                validationError
                                    ? "input-error"
                                    : ""
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>

                        <input
                            type="text"
                            placeholder="Enter description"
                            value={description}
                            onChange={(event) =>
                                setDescription(event.target.value)
                            }
                        />
                    </div>

                    <div className="form-buttons">

                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            {editingTodo
                                ? "Save Changes"
                                : "Add Todo"}
                        </button>

                        {editingTodo && (
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onCancelEdit}
                            >
                                Cancel
                            </button>
                        )}

                    </div>

                </div>

                {validationError && (
                    <div className="validation-error">
                        {validationError}
                    </div>
                )}

            </form>
        </div>
    );
}

export default TodoForm;