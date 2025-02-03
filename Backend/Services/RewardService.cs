using Backend.Entities;
using Backend.Models;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Backend.Services
{
    public class RewardService(UserManager<User> userManager) : IRewardService
    {
        private readonly UserManager<User> _userManager = userManager;
        public async Task<Result<int>> AddXP(Guid userId, double difficultyMultiplier, int NumOfTestCases)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(userId.ToString());
                if (user == null)
                {
                    return Result<int>.Failure("User not found by id");
                }

                int xpToAdd = (int)(100 * difficultyMultiplier * NumOfTestCases);

                user.XP += xpToAdd;
                var result = await _userManager.UpdateAsync(user);

                if (!result.Succeeded)
                {
                    return Result<int>.Failure("Failed to update user XP");
                }
                return Result<int>.Success(xpToAdd);
            }
            catch (Exception e)
            {
                return Result<int>.Failure(e.Message);
            }
        }

        public async Task<Result<int>> AddCoins(Guid userId, double difficultyMultiplier, int NumOfTestCases)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(userId.ToString());
                if (user == null)
                {
                    return Result<int>.Failure("User not found by id");
                }

                int coinsToAdd = (int)(25 * difficultyMultiplier * NumOfTestCases);

                user.Coins += coinsToAdd;
                var result = await _userManager.UpdateAsync(user);

                if (!result.Succeeded)
                {
                    return Result<int>.Failure("Failed to update user coins");
                }
                return Result<int>.Success(coinsToAdd);
            }
            catch (Exception e)
            {
                return Result<int>.Failure(e.Message);
            }
        }
    }
}
