using TodoApi.DTOs;
using TodoApi.Models;

namespace TodoApi.Services
{
    public interface ITodoService
    {
        Task<List<Todo>> GetAllAsync();

        Task<Todo?> GetByIdAsync(int id);

        Task<Todo> CreateAsync(CreateTodoDto dto);

        Task<Todo?> UpdateAsync(int id, UpdateTodoDto dto);

        Task<bool> ToggleDoneAsync(int id);

        Task<bool> DeleteAsync(int id);
    }
}