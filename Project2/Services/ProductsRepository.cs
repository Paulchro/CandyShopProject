using CandyShop2.DAL;
using Project2.Models;
using Microsoft.EntityFrameworkCore;
using Project2.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using System.Text.Json;
using System.IO;
using System.Reflection.Metadata.Ecma335;

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
        private Stream GetJsonStream(string productsStream)
        {
            string contentRootPath = _webHostEnvironment.ContentRootPath;
            string completePath = "";
            completePath = Path.Combine(contentRootPath, productsStream);
            return new FileStream(completePath, FileMode.Open, FileAccess.Read);
        }

        public async Task<bool> ProductExist(int productId)
        {
            Stream productsStream = GetJsonStream("JSON/Products.json");
            var products = await JsonSerializer.DeserializeAsync<List<Product>>(productsStream);
            return products.Any(c => c.Id == productId);
        }

        public async Task<Product?> GetProductById(int productId)
        {
            Stream productsStream = GetJsonStream("JSON/Products.json");
            Stream categoriesStream = GetJsonStream("JSON/Categories.json");
            var products = await JsonSerializer.DeserializeAsync<List<Product>>(productsStream);
            var categories = await JsonSerializer.DeserializeAsync<List<Category>>(categoriesStream);
            foreach (var item in products)
            {
                item.Category = categories?.FirstOrDefault(x => x.Id == item.CategoryId);
            }
            var productToReturn = products.FirstOrDefault(x => x.Id == productId);
            if(productToReturn != null)
            {
                return productToReturn;
            }
            return null;
        }

        public async Task<IEnumerable<Product>?> GetAllProductsAsync(int categoryid)
        {
            Stream productsStream = GetJsonStream("JSON/Products.json");
            Stream categoriesStream = GetJsonStream("JSON/Categories.json");
            var products = await JsonSerializer.DeserializeAsync<List<Product>>(productsStream);
            var categories = await JsonSerializer.DeserializeAsync<List<Category>>(categoriesStream);
            foreach (var item in products)
            {
                item.Category = categories?.FirstOrDefault(x => x.Id == item.CategoryId);
            }
            if (categoryid != 0)
            {
                return products.Where(x => x.CategoryId == categoryid).ToList();
            }
            else
            {
                return products.ToList();
            }
          
        }

      
    }
}
