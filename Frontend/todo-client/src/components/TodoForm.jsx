import { useEffect, useState } from "react";

function TodoForm({ onSubmit, editingTodo, onCancelEdit }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (editingTodo) {
            setTitle(editingTodo.title || "");
            setDescription(editingTodo.description || "");
        } else {
            setTitle("");
            setDescription("");
        }

        setErrors({});
    }, [editingTodo]);

    const validate = () => {
        const newErrors = {};

        if (!title.trim()) {
            newErrors.title = "Title is required";
        } else if (title.trim().length < 3) {
            newErrors.title = "Title must be at least 3 characters";
        }

        if (!description.trim()) {
            newErrors.description = "Description is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setIsSubmitting(true);

        try {
            await onSubmit({
                title: title.trim(),
                description: description.trim()
            });

            if (!editingTodo) {
                setTitle("");
                setDescription("");
            }
        } catch (error) {
            console.error("Form submission failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        setTitle("");
        setDescription("");
        setErrors({});

        if (onCancelEdit) {
            onCancelEdit();
        }
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>

            <div className="form-group">
                <label>Title</label>

                <input
                    type="text"
                    placeholder="Enter todo title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                {errors.title && (
                    <span className="error-text">
                        {errors.title}
                    </span>
                )}
            </div>

            <div className="form-group">
                <label>Description</label>

                <input
                    type="text"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                {errors.description && (
                    <span className="error-text">
                        {errors.description}
                    </span>
                )}
            </div>

            <div className="form-buttons">

                <button
                    type="submit"
                    className="primary-button"
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ? "Saving..."
                        : editingTodo
                            ? "Save Changes"
                            : "Add Todo"
                    }
                </button>

                {editingTodo && (
                    <button
                        type="button"
                        className="secondary-button"
                        onClick={handleCancel}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                )}

            </div>
        </form>
    );
}

export default TodoForm;