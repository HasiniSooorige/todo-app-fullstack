using TodoApi.DTOs;
using TodoApi.Models;
using TodoApi.Repositories;

namespace TodoApi.Services
{
    public class TodoService : ITodoService
    {
        private readonly ITodoRepository _repository;

        public TodoService(ITodoRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<Todo>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Todo?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<Todo> CreateAsync(CreateTodoDto dto)
        {
            var todo = new Todo
            {
                Title = dto.Title,
                Description = dto.Description,
                Done = false,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            return await _repository.CreateAsync(todo);
        }

        public async Task<Todo?> UpdateAsync(int id, UpdateTodoDto dto)
        {
            var todo = new Todo
            {
                Id = id,
                Title = dto.Title,
                Description = dto.Description
            };

            return await _repository.UpdateAsync(todo);
        }

        public async Task<bool> ToggleDoneAsync(int id)
        {
            var todo = await _repository.GetByIdAsync(id);

            if (todo == null)
            {
                return false;
            }

            todo.Done = !todo.Done;

            await _repository.UpdateAsync(todo);

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _repository.DeleteAsync(id);
        }
    }
}