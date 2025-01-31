using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaderboardController(IUserService userService) : ControllerBase
    {
        private readonly IUserService _userService = userService;

        [HttpGet]
        public async Task<IActionResult> GetLeaderboardData()
        {
            var entries = await _userService.GetLeaderboardAsync();

            if(!entries.Succeeded)
            {
                return NotFound(entries.Message);
            }

            return Ok(entries.Data);
        }
    }
}
