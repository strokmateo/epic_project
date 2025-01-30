using Backend.Entities;
using Backend.Models;

namespace Backend.Services.Interfaces
{
    public interface IUserService
    {
        public Task<Result<User>> GetUserByEmail(string email);
        public Task<Result<User>> GetUserById(Guid id);
        public Task<Result<bool>> AddXP(Guid userId, int xp);
    }
}
