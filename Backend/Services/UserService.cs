using Backend.Entities;
using Backend.Models;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Backend.Services
{
    public class UserService(UserManager<User> userManager) : IUserService
    {
        private readonly UserManager<User> _userManager = userManager;
        public async Task<Result<User>> GetUserByEmail(string email)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(email);

                if(user == null)
                {
                    return Result<User>.Failure("User not found by email");
                }

                return Result<User>.Success(user);
            }
            catch(Exception e)
            {
                return Result<User>.Failure(e.Message);
            }
        }

        public async Task<Result<User>> GetUserById(Guid id)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(id.ToString());
                if(user == null)
                {
                    return Result<User>.Failure("User not found by id");
                }

                return Result<User>.Success(user);
            }
            catch(Exception e)
            {
                return Result<User>.Failure(e.Message);
            }
        }


    }
}
