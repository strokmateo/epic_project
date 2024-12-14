using Backend.Entities;

namespace Backend.Repositories.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User?> GetByEmailAsync(string email);
        Task SaveChangesAsync();
    }
}
