using System.Linq.Expressions;
using Backend.Data;
using Backend.Models;
using Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories
{
    public class CodingProblemRepository : Repository<CodingProblem>, ICodingProblemRepository
    {
        public CodingProblemRepository(AppDbContext context) : base(context)
        {
        }

        public Task AddAsync(CodingProblem entity)
        {
            throw new NotImplementedException();
        }

        public Task AddRangeAsync(IEnumerable<CodingProblem> entities)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<CodingProblem>> FindAsync(Expression<Func<CodingProblem, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<CodingProblem?>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<CodingProblem?> GetByIdAsync(int id)
        {
            return await _dbSet.FirstOrDefaultAsync(c => c.Id == id);
        }

        public Task<CodingProblem?> GetByIdAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public CodingProblem GetProblemById(int problemId)
        {
            throw new NotImplementedException();
        }

        public Task RemoveAsync(CodingProblem entity)
        {
            throw new NotImplementedException();
        }

        public Task RemoveRangeAsync(IEnumerable<CodingProblem> entities)
        {
            throw new NotImplementedException();
        }
    }
}
