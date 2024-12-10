namespace Backend.Repositories;

using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Backend.Data;
using Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
{
    private readonly AppDbContext _context;
    private readonly DbSet<TEntity> _dbSet;


    public Repository(AppDbContext context)
    {
        _context = context;
        _dbSet = context.Set<TEntity>();
    }
    public async Task Add(TEntity entity)
    {
        await _dbSet.AddAsync(entity);
        await _context.SaveChangesAsync();
    }

    public async Task AddRange(IEnumerable<TEntity> entities)
    {
        await _dbSet.AddRangeAsync(entities);
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<TEntity>> Find(Expression<Func<TEntity, bool>> predicate)
    {
        return await _dbSet.Where(predicate).ToListAsync();
    }

    public async Task<IEnumerable<TEntity>> GetAll()
    {
        return await _dbSet.ToListAsync();
    }

    public async Task<TEntity> GetById(int id)
    {
        var entity = await _dbSet.FindAsync(id);
        if(entity != null)
            return entity;
        
    }

    public Task<TEntity> GetById(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task Remove(TEntity entity)
    {
        throw new NotImplementedException();
    }

    public Task RemoveRange(IEnumerable<TEntity> entities)
    {
        throw new NotImplementedException();
    }
}