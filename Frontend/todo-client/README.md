
# Todo App - Frontend

A React-based frontend application for managing Todo items through a RESTful API.

The frontend provides a clean and simple user interface for creating, viewing, editing, completing, deleting, searching, and filtering Todo items.

---

## Overview

The Todo frontend is built using React and communicates with the ASP.NET Core Web API backend through RESTful HTTP requests.

Users can:

- View all Todo items
- Create new Todo items
- Edit existing Todo items
- Mark Todo items as completed
- Delete Todo items
- Search Todo items
- Filter Todo items by status
- See loading states while data is being retrieved
- Receive user-friendly error messages
- Validate required form fields
- See an empty state when no matching Todo items are available

---

## Technology Stack

- React 19
- JavaScript
- Vite
- CSS
- Fetch API

---

## Project Structure

```text
todo-client/
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── components/
│   │   ├── TodoForm.jsx
│   │   ├── TodoItem.jsx
│   │   └── TodoList.jsx
│   │
│   ├── services/
│   │   └── todoService.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
````

---

## Architecture

The frontend follows a component-based React structure.

```text
App.jsx
   │
   ├── TodoForm
   │
   ├── TodoList
   │      │
   │      └── TodoItem
   │
   └── todoService.js
             │
             ↓
      ASP.NET Core Web API
```

### Components

#### App.jsx

The main application component.

It manages the overall Todo application state and coordinates communication between the form, list, and Todo service.

Responsibilities include:

* Loading Todo items
* Creating Todo items
* Updating Todo items
* Toggling completion status
* Deleting Todo items
* Searching
* Filtering
* Managing loading and error states

#### TodoForm.jsx

Handles creating and editing Todo items.

Responsibilities include:

* Todo title input
* Todo description input
* Form submission
* Required title validation
* Create/Edit mode handling
* Form reset

#### TodoList.jsx

Displays the Todo collection.

Responsibilities include:

* Rendering Todo items
* Displaying empty states
* Passing actions to individual Todo items

#### TodoItem.jsx

Represents an individual Todo item.

Users can:

* Edit the Todo
* Mark the Todo as completed
* Delete the Todo

Completed Todo items are visually distinguished from pending items.

#### todoService.js

Contains the API communication logic.

It provides functions for:

* Getting Todos
* Creating Todos
* Updating Todos
* Toggling completion status
* Deleting Todos

Keeping API communication in a separate service file helps keep React components focused on UI and application state.

---

## Prerequisites

Before running the frontend, make sure the following are installed:

* Node.js
* npm
* Git

The project was developed using:

* Node.js 26
* npm 11

Other recent compatible Node.js versions may also work.

---

## Installation

Navigate to the frontend project directory:

```bash
cd Frontend/todo-client
```

Install the required dependencies:

```bash
npm install
```

---

## Configuration

The frontend communicates with the backend API using the following API URL:

```text
http://localhost:5012/api/todos
```

This URL is currently configured in:

```text
src/services/todoService.js
```

Example:

```javascript
const API_URL = "http://localhost:5012/api/todos";
```

Make sure the backend API is running before using the Todo application.

---

## Running the Application

Start the Vite development server:

```bash
npm run dev
```

Vite will display the local development URL in the terminal.

For example:

```text
http://localhost:5173
```

Open the displayed URL in a web browser.

---

## Building for Production

To create a production build:

```bash
npm run build
```

The production files will be generated in the:

```text
dist/
```

directory.

To preview the production build locally:

```bash
npm run preview
```

---

## Available Features

### Create Todo

Users can create a Todo by providing:

* Title
* Optional description

The title is required before the Todo can be submitted.

---

### View Todos

The application retrieves existing Todo items from the backend API and displays them in the Todo list.

---

### Edit Todo

Users can select an existing Todo and edit:

* Title
* Description

The updated information is sent to the backend through the REST API.

---

### Complete Todo

Users can mark a Todo as completed.

Completed Todo items are visually distinguished in the interface.

---

### Delete Todo

Users can delete an existing Todo item.

The deletion is sent to the backend API and the Todo is removed from the list after a successful response.

---

## Search

The application provides Todo search functionality.

Users can search using:

* Todo title
* Todo description

The displayed list is updated based on the search text.

---

## Filtering

Todo items can be filtered using:

```text
All
Pending
Completed
```

### All

Displays all Todo items.

### Pending

Displays Todo items that have not been completed.

### Completed

Displays Todo items that have been marked as completed.

---

## Loading State

The application displays a loading state while Todo data is being retrieved from the backend API.

This prevents the interface from appearing unresponsive while waiting for the API response.

---

## Error Handling

The frontend handles API errors and displays user-friendly error messages.

For example:

```text
Failed to load todos. Please try again.
```

Errors are also handled during operations such as:

* Creating a Todo
* Updating a Todo
* Completing a Todo
* Deleting a Todo

---

## Form Validation

The Todo form validates the required title field.

### Validation Rules

* Title is required.
* Empty titles cannot be submitted.
* Description is optional.

---

## Empty State

When there are no Todo items matching the current search or filter, the application displays an appropriate empty state instead of showing a blank list.

---

## API Integration

The frontend communicates with the following backend endpoints:

| Method | Endpoint               | Purpose                  |
| ------ | ---------------------- | ------------------------ |
| GET    | `/api/todos`           | Retrieve all Todos       |
| POST   | `/api/todos`           | Create a Todo            |
| PUT    | `/api/todos/{id}`      | Update a Todo            |
| PATCH  | `/api/todos/{id}/done` | Toggle completion status |
| DELETE | `/api/todos/{id}`      | Delete a Todo            |

The API communication is implemented using the browser Fetch API.

---

## Backend Dependency

The frontend requires the Todo backend API to be running.

The backend is expected to be available at:

```text
http://localhost:5012
```

The API base URL is configured in:

```text
src/services/todoService.js
```

If the backend runs on a different port, update the `API_URL` value accordingly.

---

## Assumptions

The frontend implementation makes the following assumptions:

1. The backend API is available and running before the frontend is used.

2. The backend exposes the expected Todo REST endpoints.

3. The backend returns Todo objects using the expected properties:

```text
id
title
description
done
createdAt
updatedAt
```

4. The backend accepts JSON request bodies for create and update operations.

5. The frontend and backend are running locally during development.

6. The backend API allows requests from the Vite development server.

---

## Limitations

The current frontend implementation has the following limitations:

1. The API URL is configured directly in the service file rather than being managed through a separate environment configuration.

2. There is no authentication or user account system.

3. Todos are not associated with individual users.

4. There is no pagination because the current application is designed for a simple Todo dataset.

5. There is no offline support or local data synchronization.

6. The application depends on the backend API being available.

7. The frontend is currently designed as a single-page Todo application and does not include routing between multiple application pages.

---

## Development Scripts

The following npm scripts are available:

### Start development server

```bash
npm run dev
```

### Build production application

```bash
npm run build
```

### Run linting

```bash
npm run lint
```

### Preview production build

```bash
npm run preview
```

---

## Troubleshooting

### Backend API is not available

If the frontend displays an API error, make sure the backend is running.

From the backend project directory:

```bash
dotnet run
```

The API should be available at:

```text
http://localhost:5012
```

---

### Port mismatch

If the backend is running on a different port, update:

```text
src/services/todoService.js
```

For example:

```javascript
const API_URL = "http://localhost:YOUR_PORT/api/todos";
```

---

### Dependencies are missing

If the application fails to start, reinstall the dependencies:

```bash
npm install
```

Then start the application again:

```bash
npm run dev
```

---

## Testing the Frontend

The following functionality should be verified after starting both the frontend and backend:

* [x] Load Todo items
* [x] Create a Todo
* [x] Edit a Todo
* [x] Mark a Todo as completed
* [x] Delete a Todo
* [x] Search Todos
* [x] Filter Todos
* [x] Validate required title
* [x] Display loading state
* [x] Display API error messages
* [x] Display empty state
* [x] Display completed Todo styling

---

## Project Status

The frontend implementation is complete for the required Todo functionality.

Implemented features include:

* React-based UI
* Reusable components
* REST API integration
* Todo CRUD operations
* Todo completion
* Search
* Filtering
* Form validation
* Loading state
* Error handling
* Empty state
* Responsive UI styling

---

## Repository

GitHub repository:

[https://github.com/HasiniSooorige/todo-app-fullstack.git](https://github.com/HasiniSooorige/todo-app-fullstack.git)

The frontend source code is located under:

```text
Frontend/todo-client/
```

