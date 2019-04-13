using Project4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project4.Services
{
	interface ITodoService
	{
		void CreateTodoItem(Todo item);
		IEnumerable<Todo> SelectAll();
		Todo SelectTodo(int id);
		void DeleteTodo(int id);
		void UpdateCharacter(int id, Todo todo);
	}
}
