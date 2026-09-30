using Microsoft.AspNetCore.Mvc;
using TodoApi.DTOs;
using TodoApi.Services;

namespace TodoApi.Controllers
{
    [ApiController]
    //[Route("api/[controller]")]
    [Route("api/todos")]
    public class TodoController : ControllerBase
    {
        private readonly ITodoService _service;

        public TodoController(ITodoService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var todos = await _service.GetAllAsync();

            return Ok(todos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var todo = await _service.GetByIdAsync(id);

            if (todo == null)
            {
                return NotFound();
            }

            return Ok(todo);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateTodoDto dto)
        {
            var todo = await _service.CreateAsync(dto);

            return CreatedAtAction(
                nameof(GetById),
                new { id = todo.Id },
                todo);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(
            int id,
            UpdateTodoDto dto)
        {
            var todo = await _service.UpdateAsync(id, dto);

            if (todo == null)
            {
                return NotFound();
            }

            return Ok(todo);
        }

        [HttpPatch("{id}/done")]
        public async Task<IActionResult> ToggleDone(int id)
        {
            var result = await _service.ToggleDoneAsync(id);

            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _service.DeleteAsync(id);

            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}