using CandyShop2.DAL;
using Project2.Models;
using Microsoft.EntityFrameworkCore;
using Project2.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using System.Text.Json;

namespace Project2.Services
{
    public class ProductsRepository : IProductRepository
    {
        private readonly CandyShopContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public ProductsRepository(CandyShopContext candyShopContext, IWebHostEnvironment webHostEnvironment)
        {
            _context = candyShopContext ?? throw new ArgumentNullException(nameof(candyShopContext));
            _webHostEnvironment = webHostEnvironment;
        }
        private Stream GetJSONPath(string path)
        {
            string contentRootPath = _webHostEnvironment.ContentRootPath;
            string completePath = "";
            completePath = Path.Combine(contentRootPath, path);
            return new FileStream(completePath, FileMode.Open, FileAccess.Read);
        }

        public async Task<bool> ProductExist(int productId)
        {
            return await _context.Products.AnyAsync(c => c.Id == productId);
        }

        public async Task<Product?> GetProductById(int productId)
        {
            return await _context.Products.Include(p => p.Category)
                                .FirstOrDefaultAsync(p => p.Id == productId);
        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            Stream path = GetJSONPath("JSON/Products.json");
            var products =  JsonSerializer.DeserializeAsync<List<Product>>(path);

            return products.Result.ToList();
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
