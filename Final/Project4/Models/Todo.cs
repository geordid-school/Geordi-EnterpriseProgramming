using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project4.Models
{
	public class Todo
	{

		public int Id { get; set; }
		public string User { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public bool IsComplete { get; set; }
		public DateTime DueDate { get; set; }
		public List<string> Tags { get; set; }

	}
}
