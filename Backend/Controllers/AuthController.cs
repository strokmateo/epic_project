using Backend.Models;
using Backend.Models.LoginAuthModels;
using Backend.Services;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IUserService _userService;
        private readonly ITokenProviderService _tokenProviderService;

        public AuthController(IAuthService authService, ITokenProviderService tokenProviderService, IUserService userService)
        {
            _authService = authService;
            _userService = userService;
            _tokenProviderService = tokenProviderService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequestDto loginDto)
        {
            var result = await _authService.AreValidCredentials(loginDto);

            if (result.Succeeded)
            {
                var user = result.Data;
                var username = user.UserName ?? string.Empty;
                var email = user.Email ?? string.Empty;
                var token = _tokenProviderService.GenerateToken(user);

                var response = new LoginResponseDto(username, email, token);
                return Ok(response);
            }

            return Unauthorized("Username/Password is incorrect.");
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequestDto registerDto)
        {
            var result = await _authService.Register(registerDto);

            if(!result.Succeeded)
            {
                // return Conflict("Username or Email already taken.");
                return Conflict(result.Message);
            }

            return Ok();
        }
    }
}
