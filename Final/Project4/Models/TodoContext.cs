using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Project4.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Project4.Models
{
	public class TodoContext : IdentityDbContext<User>
	{
		public TodoContext(DbContextOptions<TodoContext> options) : base(options)
		{
			Database.EnsureCreated();
		}

		public DbSet<Todo> Todos { get; set; }

		public DbSet<UserSettings> UserSettings { get; set; }

		protected override void OnModelCreating(ModelBuilder builder) {
			base.OnModelCreating(builder);

			var splitStringConverter = new ValueConverter<List<string>, string>(v => string.Join(";", v), v => v.Split(new[] { ';' }).ToList());
			builder.Entity<Todo>().Property(nameof(Todo.Tags)).HasConversion(splitStringConverter);
		}



	}
}
