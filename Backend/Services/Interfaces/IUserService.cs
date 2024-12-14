using Backend.Entities;
using Backend.Models;

namespace Backend.Services.Interfaces
{
    public interface IUserService
    {
        Task<Result<User>> GetByIdAsync(Guid id);
        Task<Result<User>> GetUserByEmailAsync(string email);
        Task<Result<bool>> UpdateUserAsync(Guid id, User user);
        Task<Result<bool>> RemoveUserAsync(Guid id);
    }
}
