using Backend.Entities;
using Backend.Models;
using Backend.Models.Leaderboard;

namespace Backend.Services.Interfaces
{
    public interface IUserService
    {
        public Task<Result<User>> GetUserByEmail(string email);

        public Task<Result<User>> GetUserById(Guid id);
        public Task<Result<bool>> AddXP(Guid userId, int xp);
        public Task<Result<bool>> AddCoins(Guid userId, int coins);
        public Task<Result<LeaderboardDTO>> GetLeaderboardAsync();
        public Task<Result<UserDto>> GetUserDtoByEmail(string email);
    }
}
