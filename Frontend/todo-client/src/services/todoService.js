const API_URL = "http://localhost:5012/api/todos";

export const getTodos = async () => {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch todos");
    }

    return await response.json();
};

export const createTodo = async (todo) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todo)
    });

    if (!response.ok) {
        throw new Error("Failed to create todo");
    }

    return await response.json();
};

export const updateTodo = async (id, todo) => {
    console.log("PUT request:", id, todo);

    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todo)
    });

    if (!response.ok) {
        throw new Error("Failed to update todo");
    }

    return await response.json();
};


export const toggleTodo = async (id) => {
    const response = await fetch(`${API_URL}/${id}/done`, {
        method: "PATCH"
    });

    if (!response.ok) {
        throw new Error("Failed to update todo status");
    };
};

export const deleteTodo = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Failed to delete todo");
    }
};