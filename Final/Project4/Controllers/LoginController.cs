using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Project4.Models;

namespace Project4.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class LoginController : ControllerBase
	{

		private UserManager<User> _userManager;
		private SignInManager<User> _signInManager;

		public LoginController(SignInManager<User> signinManager, UserManager<User> userManager) {
			this._userManager = userManager;
			this._signInManager = signinManager;
		}

		[HttpPost("create")]
		public async Task<IActionResult> PostAsync([FromBody]MyUserLogin loginCreds) {
			var result = await _userManager.CreateAsync(new User()
			{
				UserName = loginCreds.Username
			}, loginCreds.Password);

			if(result.Succeeded) {
				return Ok();
			} else {
				Dictionary<string, IdentityError> dict = result.Errors.ToDictionary(e => e.Code);

				bool length = dict.ContainsKey("PasswordTooShort");
				bool upper = dict.ContainsKey("PasswordRequiresUpper");
				bool lower = dict.ContainsKey("PassowrdRequiresLower");
				bool number = dict.ContainsKey("PasswordRequiresDigit");
				bool duplicate = dict.ContainsKey("DuplicateUserName");

				return BadRequest(new { length, upper, lower, number, duplicate });
			}
		}


		[HttpPost()]
		public async Task<IActionResult> AuthenticateUserAsync([FromBody]MyUserLogin loginCreds) {
			var result = await _signInManager.PasswordSignInAsync(loginCreds.Username, loginCreds.Password, true, false);
			if(result.Succeeded) {
				return Ok();
			} else {
				return BadRequest();
			}
		}
    }
}