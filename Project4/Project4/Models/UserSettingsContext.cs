using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project4.Models
{
	public class UserSettingsContext : DbContext
	{

		public UserSettingsContext(DbContextOptions<UserSettingsContext> options) : base(options) {
			Database.EnsureCreated();
		}

		public DbSet<UserSettings> UserSettings { get; set; }

		//protected override void OnModelCreating(ModelBuilder builder)
		//{

		//}

	}
}
