# Todo App - Backend

A RESTful Todo API built using ASP.NET Core Web API, .NET 10, Entity Framework Core 10, and Microsoft SQL Server.

The backend provides the API layer for creating, viewing, updating, completing, and deleting Todo items.

---

## Overview

The backend is responsible for:

- Providing RESTful API endpoints
- Managing Todo items
- Applying business logic through the service layer
- Handling database operations through the repository layer
- Persisting data using Entity Framework Core
- Storing Todo data in Microsoft SQL Server
- Managing database schema changes through EF Core migrations

---

## Technology Stack

- .NET 10
- ASP.NET Core Web API
- Entity Framework Core 10
- Microsoft SQL Server
- C#
- REST API
- Git / GitHub

---

## Architecture

The backend follows a layered architecture to separate responsibilities and keep the application maintainable.

```text
HTTP Request
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
````

### Controllers

The Controller layer handles HTTP requests and responses.

Responsibilities include:

* Receiving API requests
* Validating request parameters
* Calling the appropriate service methods
* Returning HTTP responses

---

### Services

The Service layer contains the application's business logic.

Responsibilities include:

* Creating Todo items
* Updating Todo items
* Retrieving Todo items
* Toggling completion status
* Deleting Todo items

The service layer keeps business logic separate from HTTP and database concerns.

---

### Repositories

The Repository layer handles data access operations.

Responsibilities include:

* Retrieving Todo records
* Creating Todo records
* Updating Todo records
* Deleting Todo records

The repository communicates with Entity Framework Core through the application's `DbContext`.

---

### Data

The Data layer contains the Entity Framework Core database context.

The main database context is:

```text
TodoDbContext
```

It provides access to the `Todos` database table through Entity Framework Core.

---

### Models

The Models folder contains the application's domain entities.

The main entity is:

```text
Todo
```

The Todo entity contains:

* Id
* Title
* Description
* Done
* CreatedAt
* UpdatedAt

---

### DTOs

The DTOs folder contains objects used for transferring data between the frontend and API.

Current DTOs include:

```text
CreateTodoDto
UpdateTodoDto
```

DTOs prevent the API from directly exposing the entity model for create and update requests.

---

## Project Structure

```text
TodoApi/
├── Controllers/
│   └── TodosController.cs
│
├── Data/
│   └── TodoDbContext.cs
│
├── DTOs/
│   ├── CreateTodoDto.cs
│   └── UpdateTodoDto.cs
│
├── Migrations/
│   ├── 20260929162108_InitialCreate.cs
│   ├── 20260929162108_InitialCreate.Designer.cs
│   └── TodoDbContextModelSnapshot.cs
│
├── Models/
│   └── Todo.cs
│
├── Repositories/
│   ├── ITodoRepository.cs
│   └── TodoRepository.cs
│
├── Services/
│   ├── ITodoService.cs
│   └── TodoService.cs
│
├── Properties/
│   └── launchSettings.json
│
├── Program.cs
├── TodoApi.csproj
├── appsettings.json
└── README.md
```

---

## API Endpoints

The backend exposes the following RESTful endpoints:

| Method | Endpoint               | Description                   |
| ------ | ---------------------- | ----------------------------- |
| GET    | `/api/todos`           | Get all Todo items            |
| POST   | `/api/todos`           | Create a new Todo             |
| PUT    | `/api/todos/{id}`      | Update an existing Todo       |
| PATCH  | `/api/todos/{id}/done` | Toggle Todo completion status |
| DELETE | `/api/todos/{id}`      | Delete a Todo                 |

---

## Create Todo

### Request

```http
POST /api/todos
```

Example request body:

```json
{
  "title": "Learn React",
  "description": "Build Todo frontend with React"
}
```

---

## Update Todo

### Request

```http
PUT /api/todos/1
```

Example request body:

```json
{
  "title": "Learn React and .NET",
  "description": "Build the full stack Todo application"
}
```

---

## Toggle Todo Completion

### Request

```http
PATCH /api/todos/1/done
```

This endpoint toggles the completion status of the specified Todo.

---

## Delete Todo

### Request

```http
DELETE /api/todos/1
```

This removes the specified Todo from the database.

---

## Database

The backend uses:

```text
Microsoft SQL Server
```

Database name:

```text
TodoDb
```

The application uses Entity Framework Core 10 for database access and migrations.

---

## Database Connection

The SQL Server connection string is configured in:

```text
appsettings.json
```

Current development configuration:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=DESKTOP-B5P328E\\SQLEXPRESS;Database=TodoDb;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

### Important

The server name above is specific to the development machine used during implementation.

When running the project on another machine, update the connection string to match the local SQL Server instance.

For example:

```text
Server=YOUR_SERVER_NAME;
Database=TodoDb;
Trusted_Connection=True;
TrustServerCertificate=True;
```

---

# MongoDB Connection Notes

The assignment instructions mention MongoDB connection notes.

However, this implementation does **not** use MongoDB.

The backend was implemented using:

```text
Microsoft SQL Server
Entity Framework Core 10
```

The database used by this implementation is:

```text
TodoDb
```

Therefore, no MongoDB Atlas connection string or local MongoDB configuration is required for this implementation.

The database connection is managed through the SQL Server connection string in:

```text
appsettings.json
```

This choice was made because the implemented solution uses Entity Framework Core with the SQL Server provider.

---

## Prerequisites

Make sure the following are installed before running the backend:

* .NET 10 SDK
* Microsoft SQL Server
* SQL Server Express or another compatible SQL Server instance
* SQL Server Management Studio (optional)
* Git

---

## Verify .NET Installation

Check the installed .NET version:

```bash
dotnet --version
```

The project targets:

```text
.NET 10
```

---

## Setup

Clone the repository:

```bash
git clone https://github.com/HasiniSooorige/todo-app-fullstack.git
```

Navigate to the project:

```bash
cd todo-app-fullstack
```

Navigate to the backend:

```bash
cd Backend/TodoApi
```

---

## Restore Dependencies

Restore the .NET dependencies:

```bash
dotnet restore
```

---

## Build the Backend

Build the project:

```bash
dotnet build
```

A successful build should display:

```text
Build succeeded.
```

---

## Database Setup

Make sure SQL Server is running before applying the migrations.

The project already contains an Entity Framework Core migration.

To apply the existing migration:

```bash
dotnet ef database update
```

This creates the required database and database table structure.

The main table created by the migration is:

```text
Todos
```

---

## Entity Framework Core CLI

If the `dotnet ef` command is not available, install the Entity Framework Core CLI tool:

```bash
dotnet tool install --global dotnet-ef
```

Verify the installation:

```bash
dotnet ef --version
```

The project uses Entity Framework Core 10.

---

## Database Migrations

The project uses Entity Framework Core migrations to manage database schema changes.

### Apply Existing Migrations

```bash
dotnet ef database update
```

### Create a New Migration

After changing the entity model:

```bash
dotnet ef migrations add MigrationName
```

Example:

```bash
dotnet ef migrations add AddPriorityToTodo
```

Then apply the migration:

```bash
dotnet ef database update
```

---

## Run the Backend

Start the API using:

```bash
dotnet run
```

The backend is configured with the following local URLs:

```text
HTTP  : http://localhost:5012
HTTPS : https://localhost:7028
```

The HTTP API base URL is:

```text
http://localhost:5012
```

---

## Frontend API Integration

The React frontend communicates with the backend using:

```text
http://localhost:5012/api/todos
```

The frontend service file is:

```text
Frontend/todo-client/src/services/todoService.js
```

---

## Database Schema

The main database table is:

```text
Todos
```

The table contains:

| Column      | Type      | Description               |
| ----------- | --------- | ------------------------- |
| Id          | int       | Primary key               |
| Title       | nvarchar  | Todo title                |
| Description | nvarchar  | Optional Todo description |
| Done        | bit       | Completion status         |
| CreatedAt   | datetime2 | Creation timestamp        |
| UpdatedAt   | datetime2 | Last update timestamp     |

---

## Example Todo Response

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

---

## Error Handling

The API handles common Todo operations and returns appropriate HTTP responses for successful and unsuccessful operations.

The frontend consumes these responses and displays user-friendly messages where appropriate.

---

## Assumptions

The backend implementation makes the following assumptions:

1. Microsoft SQL Server is installed and running.

2. The configured SQL Server instance is accessible by the application.

3. The database user has permission to create and modify the `TodoDb` database and its tables.

4. The application is primarily intended for local development and evaluation.

5. The frontend communicates with the backend using the configured local API URL.

6. The API is expected to be available before the React frontend performs Todo operations.

7. The current application does not require user authentication.

8. Todo items are not associated with individual user accounts.

---

## Limitations

The current backend implementation has the following limitations:

1. The application does not include authentication or authorization.

2. Todo items are not associated with individual users.

3. The SQL Server connection string is configured for local development.

4. The application does not include production-ready secret management.

5. The API does not currently implement pagination.

6. The application does not include advanced logging or centralized monitoring.

7. The API is designed for a simple Todo application and does not include advanced user management or role-based access control.

8. The current implementation uses SQL Server instead of MongoDB.

---

## Development Workflow

The project uses Git for version control.

The main development branch is:

```text
develop
```

Typical development workflow:

```bash
git status
git add .
git commit -m "commit message"
git push origin develop
```

---

## Testing the API

The API can be tested using:

* Browser
* PowerShell
* Postman
* Swagger, if enabled/configured

Example GET request:

```text
http://localhost:5012/api/todos
```

Example PowerShell request:

```powershell
Invoke-RestMethod `
  -Uri "http://localhost:5012/api/todos" `
  -Method Get
```

---

## API Verification

The following operations have been tested during development:

* [x] Get Todo items
* [x] Create Todo
* [x] Update Todo
* [x] Toggle Todo completion
* [x] Delete Todo
* [x] SQL Server database persistence
* [x] Entity Framework Core migrations
* [x] Repository layer
* [x] Service layer
* [x] Controller layer

---

## Project Status

The backend implementation is complete for the required Todo functionality.

Implemented:

* ASP.NET Core Web API
* .NET 10
* Entity Framework Core 10
* Microsoft SQL Server
* Layered architecture
* Repository pattern
* Service layer
* DTOs
* CRUD operations
* Todo completion functionality
* Database migrations
* RESTful API endpoints

---

## Repository

GitHub repository:

[https://github.com/HasiniSooorige/todo-app-fullstack.git](https://github.com/HasiniSooorige/todo-app-fullstack.git)

Backend source code:

```text
Backend/TodoApi/
```
