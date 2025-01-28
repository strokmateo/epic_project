using Backend.Models;


namespace Backend.Repositories.Interfaces
{
    public interface ICodingProblemRepository
    {
        CodingProblem GetProblemById(int problemId);
    }
}
