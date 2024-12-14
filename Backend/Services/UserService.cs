using System.Diagnostics;
using Backend.Entities;
using Backend.Models;
using Backend.Repositories.Interfaces;
using Backend.Services.Interfaces;

namespace Backend.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<Result<bool>> RemoveUserAsync(Guid id)
        {
            try
            {
                var userToRemove = await _userRepository.GetByIdAsync(id);
                if(userToRemove == null)
                {
                    Result<bool>.Failure("User Not Found.");
                }

                await _userRepository.RemoveAsync(userToRemove);
                return Result<bool>.Success(true);
            }
            catch (Exception e)
            {
                return Result<bool>.Failure(e.Message);
            }
        }

        public async Task<Result<User?>> GetByIdAsync(Guid id)
        {
            try
            {
                var userToGet = await _userRepository.GetByIdAsync(id);
                if (userToGet == null)
                {
                    return Result<User>.Failure("User Not Found by Id");
                }

                return Result<User>.Success(userToGet);
            }
            catch (Exception e)
            {
                return Result<User>.Failure(e.Message);
            }
        }

        public async Task<Result<User?>> GetUserByEmailAsync(string email)
        {
            try
            {
                var userToGet = await _userRepository.GetByEmailAsync(email);
                if (userToGet == null)
                {
                    return Result<User>.Failure("User Not Found by Email");
                }
                return Result<User>.Success(userToGet);
            }
            catch (Exception e)
            {
                return Result<User>.Failure(e.Message);
            }
        }

        public async Task<Result<bool>> UpdateUserAsync(Guid id, User user)
        {
            try
            { 
                var userToUpdate = await _userRepository.GetByIdAsync(id);
                if (userToUpdate == null)
                {
                    return Result<bool>.Failure("User Not Found by Id");
                }
                // add update logic after user model is completed
                return Result<bool>.Success(true);
            }
            catch (Exception e)
            {
                return Result<bool>.Failure(e.Message);
            }
        }
    }
}
