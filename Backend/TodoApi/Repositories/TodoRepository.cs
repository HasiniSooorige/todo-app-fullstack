using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models;

namespace TodoApi.Repositories
{
    public class TodoRepository : ITodoRepository
    {
        private readonly TodoDbContext _context;

        public TodoRepository(TodoDbContext context)
        {
            _context = context;
        }

        public async Task<List<Todo>> GetAllAsync()
        {
            return await _context.Todos
                .OrderByDescending(x => x.CreatedAt)
                .ToListAsync();
        }

        public async Task<Todo?> GetByIdAsync(int id)
        {
            return await _context.Todos.FindAsync(id);
        }

        public async Task<Todo> CreateAsync(Todo todo)
        {
            _context.Todos.Add(todo);
            await _context.SaveChangesAsync();

            return todo;
        }

        public async Task<Todo?> UpdateAsync(Todo todo)
        {
            var existingTodo = await _context.Todos.FindAsync(todo.Id);

            if (existingTodo == null)
            {
                return null;
            }

            existingTodo.Title = todo.Title;
            existingTodo.Description = todo.Description;
            existingTodo.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return existingTodo;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var todo = await _context.Todos.FindAsync(id);

            if (todo == null)
            {
                return false;
            }

            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}