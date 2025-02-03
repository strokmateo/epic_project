using Backend.Models;

namespace Backend.Services.Interfaces
{
    public interface IRewardService
    {
        public Task<Result<int>> AddXP(Guid userId, double difficultyMultiplier, int NumOfTestCases);
        public Task<Result<int>> AddCoins(Guid userId, double difficultyMultiplier, int NumOfTestCases);

    }
}
