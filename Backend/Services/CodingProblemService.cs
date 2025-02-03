using Backend.Models;
using Backend.Repositories.Interfaces;
using Backend.Services.Interfaces;

namespace Backend.Services
{
    public class CodingProblemService(ICodingProblemRepository problemRepository) : ICodingProblemService
    {
        private readonly ICodingProblemRepository _problemRepository = problemRepository;
        public async Task<Result<CodingProblem>> GetCodingProblemByIdAsync(int id)
        {
            try
            {
                var problem = await _problemRepository.GetProblemByIdAsync(id);

                if(problem == null)
                {
                    return Result<CodingProblem>.Failure("Problem with specified Id not found.");
                }

                return Result<CodingProblem>.Success(problem);
            }
            catch (Exception e)
            {
                return Result<CodingProblem>.Failure(e.Message);
            }
        }
    }
}
