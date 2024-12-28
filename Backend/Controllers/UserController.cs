using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(IUserService userService) : ControllerBase
    {
        private readonly IUserService _userService = userService;


        // Temp controller method for testing JWT.
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetFullUserByEmail(string email)
        {
            var user = await _userService.GetUserByEmail(email);

            if(user == null)
            {
                return NotFound();
            }

            return Ok(user.Data);
        }
    }
}
