using Backend.Models;

namespace Backend.Services.Interfaces
{
    public interface IAuthService
    {
        public Task<Result<bool>> AreValidCredentials();
        public Task<Result<bool>> Register();
    }
}
