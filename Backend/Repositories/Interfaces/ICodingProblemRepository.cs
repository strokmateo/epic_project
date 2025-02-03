using Backend.Models;


namespace Backend.Repositories.Interfaces
{
    public interface ICodingProblemRepository
    {
        Task<CodingProblem?> GetProblemByIdAsync(int id);
    }
}
