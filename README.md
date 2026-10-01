
# Todo App

A full-stack Todo application built using React.js, .NET 10, Layered Architecture, and Microsoft SQL Server.

## Overview

This application allows users to manage their todo tasks through a simple and clean web interface.

Users can:

- View todos
- Create new todos
- Edit existing todos
- Mark todos as completed
- Delete todos
- Search todos
- Filter todos by status

## Technology Stack

### Frontend

- React 19
- Vite
- JavaScript
- CSS

### Backend

- .NET 10
- ASP.NET Core Web API
- Entity Framework Core 10
- Layered Architecture

### Database

- Microsoft SQL Server

### Development Tools

- Visual Studio
- Visual Studio Code
- Git
- GitHub

## Project Structure

```text
TodoApp/
├── Backend/
│   └── TodoApi/
│       ├── Controllers/
│       ├── Data/
│       ├── DTOs/
│       ├── Migrations/
│       ├── Models/
│       ├── Repositories/
│       ├── Services/
│       ├── Program.cs
│       ├── TodoApi.csproj
│       └── appsettings.json
│
├── Frontend/
│   └── todo-client/
│       ├── src/
│       │   ├── assets/
│       │   ├── components/
│       │   │   ├── TodoForm.jsx
│       │   │   ├── TodoItem.jsx
│       │   │   └── TodoList.jsx
│       │   ├── services/
│       │   │   └── todoService.js
│       │   ├── App.jsx
│       │   ├── App.css
│       │   ├── index.css
│       │   └── main.jsx
│       │
│       ├── package.json
│       └── vite.config.js
│
├── .gitignore
└── README.md
````

## Architecture

The application follows a layered architecture on the backend to separate responsibilities and keep the code maintainable.

```text
React Components
       ↓
todoService.js
       ↓
ASP.NET Core Web API
       ↓
Controller Layer
       ↓
Service Layer
       ↓
Repository Layer
       ↓
Entity Framework Core
       ↓
Microsoft SQL Server
```

### Backend Layers

* **Controllers**
  Handles HTTP requests and responses.

* **Services**
  Contains the application's business logic.

* **Repositories**
  Handles database access operations.

* **Data**
  Contains the Entity Framework Core `DbContext`.

* **Models**
  Contains the application's entity models.

* **DTOs**
  Defines the data transferred between the client and API.

### Frontend Components

* **TodoForm**
  Handles creating and editing todos.

* **TodoList**
  Displays the list of todos.

* **TodoItem**
  Displays an individual todo and provides actions such as edit, complete, and delete.

* **todoService.js**
  Handles communication between the React frontend and the backend API.

## API Endpoints

The backend provides RESTful API endpoints for managing Todo items.

| Method | Endpoint               | Description                   |
| ------ | ---------------------- | ----------------------------- |
| GET    | `/api/todos`           | Get all todos                 |
| POST   | `/api/todos`           | Create a new todo             |
| PUT    | `/api/todos/{id}`      | Update an existing todo       |
| PATCH  | `/api/todos/{id}/done` | Toggle todo completion status |
| DELETE | `/api/todos/{id}`      | Delete a todo                 |

### Create Todo

**Request**

```json
{
  "title": "Learn React",
  "description": "Build Todo frontend with React"
}
```

### Update Todo

**Request**

```json
{
  "title": "Learn React and .NET",
  "description": "Build the full stack Todo application"
}
```

### Todo Response

```json
{
  "id": 1,
  "title": "Learn React and .NET",
  "description": "Build the full stack Todo application",
  "done": false,
  "createdAt": "2026-09-30T15:18:09.8668963Z",
  "updatedAt": "2026-09-30T15:21:00.6296301Z"
}
```

## Database

The application uses Microsoft SQL Server with Entity Framework Core.

The main database table is:

```text
Todos
```

The `Todos` table contains:

| Column      | Description               |
| ----------- | ------------------------- |
| Id          | Unique identifier         |
| Title       | Todo title                |
| Description | Todo description          |
| Done        | Completion status         |
| CreatedAt   | Creation date and time    |
| UpdatedAt   | Last update date and time |

Entity Framework Core migrations are used to create and update the database schema.

## Getting Started

### Prerequisites

Make sure the following are installed:

* .NET 10 SDK
* Node.js
* npm
* Microsoft SQL Server
* Git

### Clone the Repository

```bash
git clone https://github.com/HasiniSooorige/todo-app-fullstack.git
```

Navigate to the project:

```bash
cd todo-app-fullstack
```

## Backend Setup

Navigate to the backend project:

```bash
cd Backend/TodoApi
```

Restore the .NET dependencies:

```bash
dotnet restore
```

Build the project:

```bash
dotnet build
```

### Database Configuration

Update the SQL Server connection string in:

```text
Backend/TodoApi/appsettings.json
```

The application uses the `TodoDb` database.

After configuring the connection string, apply the Entity Framework Core migrations:

```bash
dotnet ef database update
```

Run the backend:

```bash
dotnet run
```

The backend is configured with the following local URLs:

```text
HTTP  : http://localhost:5012
HTTPS : https://localhost:7028
```

## Frontend Setup

Open a new terminal and navigate to the frontend:

```bash
cd Frontend/todo-client
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

Vite will display the local frontend URL in the terminal.

## Application Features

### Todo Management

* Create todos with a title and optional description.
* View all existing todos.
* Edit todo title and description.
* Mark todos as completed.
* Delete todos.

### Search and Filtering

Users can search todos by title or description.

Todos can also be filtered by:

* All
* Pending
* Completed

### User Experience

The application includes:

* Loading state while fetching todos.
* User-friendly error messages.
* Form validation for the required title.
* Empty state when no todos match the selected search or filter.
* Completed todos are visually distinguished.
* Clean and responsive UI.
* Separate React components for maintainability.

## Error Handling

The application handles API and UI errors gracefully.

For example, if todos cannot be loaded, the user is shown a user-friendly error message instead of only logging the error to the browser console.

## Form Validation

The Todo form validates required fields before submitting data.

### Validation Rules

* Title is required.
* Description is optional.
* Empty titles cannot be submitted.

## Search and Filter Behavior

### Search

The search functionality allows users to search todos using:

* Todo title
* Todo description

### Filters

The available filters are:

```text
All
Pending
Completed
```

This allows users to quickly view todos based on their completion status.

## Database Migrations

The project uses Entity Framework Core migrations for database schema management.

To apply existing migrations:

```bash
dotnet ef database update
```

To create a new migration after modifying the entity model:

```bash
dotnet ef migrations add MigrationName
```

Then apply it:

```bash
dotnet ef database update
```

## Git Workflow

The project was developed using Git with the `develop` branch.

Changes were committed in logical stages during development and pushed to GitHub.

Example:

```bash
git status
git add .
git commit -m "commit message"
git push origin develop
```

## Project Status

The Todo application is fully implemented and tested.

### Completed

* [x] Backend API
* [x] Layered architecture
* [x] SQL Server database
* [x] Entity Framework Core
* [x] Entity Framework Core migrations
* [x] Todo CRUD operations
* [x] React frontend
* [x] Create Todo
* [x] View Todos
* [x] Edit Todo
* [x] Mark Todo as completed
* [x] Delete Todo
* [x] Search
* [x] Filter
* [x] Loading state
* [x] Error handling
* [x] Form validation
* [x] Empty state
* [x] UI styling
* [x] Git version control

## Repository

GitHub:

[https://github.com/HasiniSooorige/todo-app-fullstack.git](https://github.com/HasiniSooorige/todo-app-fullstack.git)

````

