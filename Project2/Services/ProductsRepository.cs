using CandyShop2.DAL;
using Project2.Models;
using Microsoft.EntityFrameworkCore;
using Project2.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using System.Text.Json;
using System.IO;
using System.Reflection.Metadata.Ecma335;
using Azure.Core.GeoJson;

namespace Project2.Services
{
    public class ProductsRepository : IProductRepository
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        public ProductsRepository(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }
        private Stream GetJsonStream(string path)
        {
            string contentRootPath = _webHostEnvironment.ContentRootPath;
            string completePath = "";
            completePath = Path.Combine(contentRootPath, path);
        
            return new FileStream(completePath, FileMode.Open, FileAccess.Read);
        }

        public async Task<bool> ProductExist(int productId)
        {
            Stream productsStream = GetJsonStream("JSON/Products.json");
            var products = await JsonSerializer.DeserializeAsync<List<Product>>(productsStream);
            productsStream.Close();
            return products.Any(c => c.Id == productId);
        }

        public async Task<Product?> GetProductById(int productId)
        {
            Stream productsStream = GetJsonStream("JSON/Products.json");
            var products = await JsonSerializer.DeserializeAsync<List<Product>>(productsStream);
   
            var productToReturn = products.FirstOrDefault(x => x.Id == productId);

            productsStream.Close();

            if (productToReturn != null)
            {
                return productToReturn;
            }

            return null;
        }

        public async Task<IEnumerable<Product>?> GetAllProductsAsync()
        {
            Stream productsStream = GetJsonStream("JSON/Products.json");
   
            var products = await JsonSerializer.DeserializeAsync<List<Product>>(productsStream);
     
            productsStream.Close();
            if (products != null)
            {
                return products.ToList();
            }
            return null;
        }

        public async Task AddProduct(string filePath, Product product)
        {
            Stream productsStream = GetJsonStream("JSON/Products.json");
            var products = await JsonSerializer.DeserializeAsync<List<Product>>(productsStream);
           
            products.Add(product);
           

            var serializedData = JsonSerializer.Serialize(products);
            productsStream.Close();

            using var writer = new StreamWriter(filePath);
            await writer.WriteAsync(serializedData);
        }
    }
}
