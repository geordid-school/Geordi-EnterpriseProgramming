using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Project4.Models;
using Project4.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Project4.Controllers
{
	[Route("api/[controller]")]
	public class TodoController : Controller
	{
		private ITodoService _todoService;

		public TodoController(ITodoService todoService)
		{
			_todoService = todoService;
		}

		// GET: api/<controller>
		[HttpGet]
		public IActionResult Get()
		{
			var todos = _todoService.SelectAll();
			return Ok(todos);
		}

		// GET api/<controller>/5
		[HttpGet("{id}")]
		public IActionResult Get(int id)
		{
			var todo = _todoService.SelectTodo(id);
			if(todo != null) {
				return Ok(todo);
			} else {
				return NotFound();
			}
		}

		// POST api/<controller>
		[HttpPost]
		public void Post([FromBody]Todo value)
		{
			_todoService.CreateTodoItem(value);
		}

		// PUT api/<controller>/5
		[HttpPut("{id}")]
		public void Put(int id, [FromBody]Todo value)
		{
			_todoService.UpdateTodo(id, value);
		}

		// DELETE api/<controller>/5
		[HttpDelete("{id}")]
		public void Delete(int id)
		{
			_todoService.DeleteTodo(id);
		}
	}
}
