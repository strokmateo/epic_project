using Backend.Entities;
using Backend.Models;
using Backend.Models.Leaderboard;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using System;
using System.Threading.Tasks;
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
        public async Task<Result<bool>> AddXP(Guid userId, int xp)
        {
            try
            {
                var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Id == userId);
                if(user == null)
                {
                    return Result<bool>.Failure("User not found by id");
                }

                user.XP += xp;
                var result = await _userManager.UpdateAsync(user);

                if (!result.Succeeded)
                {
                    return Result<bool>.Failure("Failed to update user XP");
                }
                return Result<bool>.Success(true);
            }
            catch
            {
                return Result<bool>.Failure("Failed to update user XP");
            }
        }

        public async Task<Result<bool>> AddCoins(Guid userId, int coins)
        {
            try
            {
                var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Id == userId);
                if (user == null)
                {
                    return Result<bool>.Failure("User not found by id");
                }
                user.Coins += coins;
                var result = await _userManager.UpdateAsync(user);
                if (!result.Succeeded)
                {
                    return Result<bool>.Failure("Failed to update user coins");
                }
                return Result<bool>.Success(true);
            }
            catch
            {
                return Result<bool>.Failure("Failed to update user coins");
            }
        }

        public async Task<Result<LeaderboardDTO>> GetLeaderboardAsync()
        {
            try
            {
                var users = await _userManager.Users
                    .OrderByDescending(u => u.XP) 
                    .Select(u => new LeaderboardEntryDTO
                    {
                        UserId = u.Id,
                        Username = u.UserName,
                        Xp = u.XP,
                        Coins = u.Coins
                    })
                    .ToListAsync();

                if (!users.Any())
                {
                    return Result<LeaderboardDTO>.Failure("No leaderboard data available.");
                }

                var leaderboard = new LeaderboardDTO { Entries = users };

                return Result<LeaderboardDTO>.Success(leaderboard);
            }
            catch (Exception e)
            {
                return Result<LeaderboardDTO>.Failure($"Failed to fetch leaderboard: {e.Message}");
            }
        }

        public async Task<Result<UserDto>> GetUserDtoByEmail(string email)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(email);

                if (user == null)
                {
                    return Result<UserDto>.Failure("User not found by email");
                }

                var userDto = new UserDto
                {
                    Id = user.Id,
                    Username = user.UserName,
                    Email = user.Email,
                                    // Ensure User entity has this property or adjust accordingly
                    Xp = user.XP,       // Assuming entity property is 'XP'
                    Coins = user.Coins
                };

                return Result<UserDto>.Success(userDto);
            }
            catch (Exception e)
            {
                return Result<UserDto>.Failure(e.Message);
            }
        }
    }
}
