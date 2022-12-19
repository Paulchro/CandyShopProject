using CandyShop2.DAL;
using Project2.Models;
using Microsoft.EntityFrameworkCore;

namespace Project2.Services
{
    public class ProductsRepository : IProducts
    {
        private readonly CandyShopContext _context;

        public ProductsRepository(CandyShopContext candyShopContext)
        {
            _context = candyShopContext ?? throw new ArgumentNullException(nameof(candyShopContext));
        }

        public Task Add(Product product)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            return await _context.Products.ToListAsync();
        }

        public async Task<Product?> GetProductById(int productId)
        {
            return await _context.Products.Where(x => x.Id == productId).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Product>> GetProductsByCategoryAsync(int categoryid)
        {
            return await _context.Products.Where(x => x.Category.Id == categoryid).ToListAsync();
        }

        public Task<bool> ProductExist(int cityId)
        {
            throw new NotImplementedException();
        }

        public Task Remove(Product product)
        {
            throw new NotImplementedException();
        }

        public Task Update(Product product)
        {
            throw new NotImplementedException();
        }
        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync() >= 0);
        }
    }
}
