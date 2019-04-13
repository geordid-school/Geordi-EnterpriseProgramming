using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Project4.Models;

namespace Project4.Services
{
	public class TodoService : ITodoService
	{
		private TodoContext _context;

		TodoService(TodoContext context) 
		{
			_context = context;
		}

		public void CreateTodoItem(Todo item)
		{
			throw new NotImplementedException();
		}

		public void DeleteTodo(int id)
		{
			throw new NotImplementedException();
		}

		public IEnumerable<Todo> SelectAll()
		{
			throw new NotImplementedException();
		}

		public Todo SelectTodo(int id)
		{
			throw new NotImplementedException();
		}

		public void UpdateCharacter(int id, Todo todo)
		{
			throw new NotImplementedException();
		}
	}
}
