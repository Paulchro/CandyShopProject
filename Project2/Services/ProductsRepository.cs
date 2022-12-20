using CandyShop2.DAL;
using Project2.Models;
using Microsoft.EntityFrameworkCore;
using Project2.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Project2.Services
{
    public class ProductsRepository : IProductRepository
    {
        private readonly CandyShopContext _context;

        public ProductsRepository(CandyShopContext candyShopContext)
        {
            _context = candyShopContext ?? throw new ArgumentNullException(nameof(candyShopContext));
        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            return await _context.Products.Include(x=>x.Category).ToListAsync();
        }

        public async Task<Product?> GetProductById(int productId)
        {
            return await _context.Products.Include(p => p.Category)
                                 .FirstOrDefaultAsync(p => p.Id == productId);
        }

        public async Task<IEnumerable<Product>> GetProductsByCategoryAsync(int categoryid)
        {
            return await _context.Products.Where(x => x.Category.Id == categoryid).ToListAsync();
        }

        public async Task<bool> ProductExist(int productId)
        {
            return await _context.Products.AnyAsync(c => c.Id == productId);
        }

        public void DeleteProduct(Product product)
        {
            _context.Products.Remove(product);
        }

        public async Task Update(Product product)
        {
            _context.Entry(product).State = EntityState.Modified;
        }
        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync() >= 0);
        }

        public async Task Add(Product product)
        {
            var productExists = ProductExist(product.Id);
            if(!await productExists)
            {
                await _context.AddAsync(product);
            }
        }
    }
}
