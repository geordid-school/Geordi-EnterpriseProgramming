using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project4.Models
{
	public class Todo
	{
		#region Backing Fields
		
		private List<string> _tagList;

		#endregion

		#region Public Properties

		public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public bool IsComplete { get; set; }
		public DateTime DueDate { get; set; }
		public List<string> Tags
		{
			get
			{
				if(_tagList == null) {
					_tagList = new List<string>();
				}
				return _tagList;
			}
			set
			{
				_tagList = value;
			}
		}

		#endregion
	}
}
