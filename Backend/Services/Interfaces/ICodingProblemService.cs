using Backend.Models;

namespace Backend.Services.Interfaces
{
    public interface ICodingProblemService
    {
        Task<Result<CodingProblem>> GetCodingProblemByIdAsync(int id);
    }
}
