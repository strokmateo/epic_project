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

        public async Task<CodingProblem?> GetProblemByIdAsync(int id)
        {
            return await _dbSet
                .Include(cp => cp.TestCases)
                .FirstOrDefaultAsync(c => c.Id == id);
        }
    }
}
