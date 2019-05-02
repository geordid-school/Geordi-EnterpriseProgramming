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

		public TodoService(TodoContext context) 
		{
			_context = context;
		}

		public void CreateTodoItem(Todo todo)
		{
			_context.Todos.Add(todo);
			_context.SaveChanges();
		}

		public void DeleteTodo(int id)
		{
			var todoToDelete = SelectTodo(id);
			if(todoToDelete != null) {
				_context.Todos.Remove(todoToDelete);
				_context.SaveChanges();
			}
		}

		public IEnumerable<Todo> SelectAll()
		{
			return _context.Todos.ToList();
		}

		public Todo SelectTodo(int id)
		{
			return _context.Todos.Where(todo => id == todo.Id).FirstOrDefault();
		}

		public void UpdateTodo(int id, Todo todo)
		{
			var todoToUpdate = SelectTodo(id);
			todoToUpdate.Name = todo.Name;
			todoToUpdate.Description = todo.Description;
			todoToUpdate.IsComplete = todo.IsComplete;
			todoToUpdate.DueDate = todo.DueDate;
			todoToUpdate.Tags = todo.Tags;
			_context.SaveChanges();
		}
	}
}
