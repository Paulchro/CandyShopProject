using CandyShop2.DAL;
using Microsoft.EntityFrameworkCore;
using Project2.Interfaces;
using Project2.Models;

namespace Project2.Services
{
    public class CategoriesRepository : ICategoryRepository
    {
        private readonly CandyShopContext _context;

        public CategoriesRepository(CandyShopContext candyShopContext)
        {
            _context = candyShopContext ?? throw new ArgumentNullException(nameof(candyShopContext));
        }
        public Task Add(Category category)
        {
            throw new NotImplementedException();
        }

        public Task<bool> CategoryExists(int categoryId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Category>> GetCategories()
        {
            throw new NotImplementedException();
        }

        public async Task<Category> GetCategoryById(int categoryId)
        {
            return await _context.Categories.FirstOrDefaultAsync(c => c.Id == categoryId);
        }

        public Task Remove(Category category)
        {
            throw new NotImplementedException();
        }

        public Task<bool> SaveChangesAsync()
        {
            throw new NotImplementedException();
        }

        public Task Update(Category category)
        {
            throw new NotImplementedException();
        }
    }
}
