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
using System.Drawing.Printing;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Reflection;
using Project2.Dto;
using Microsoft.AspNetCore.JsonPatch;

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

        public async Task<(IEnumerable<Product>?, PaginationMetadata)> GetAllProductsAsync(string[]? orderby,string? name, int pageNumber, int pageSize)
        {
            Stream productsStream = GetJsonStream("JSON/Products.json");
            if(pageSize == 0 || pageNumber == 0)
            {
                pageSize = int.MaxValue;
                pageNumber = 1;
            }
            var products = await JsonSerializer.DeserializeAsync<List<Product>>(productsStream);
            productsStream.Close();
            if (!string.IsNullOrWhiteSpace(name) && products != null)
            {
                name = name.Trim();
                products = products.Where(c => c.Name.Contains(name, StringComparison.OrdinalIgnoreCase)).OrderBy(p => p.Name.Trim()).Skip(pageSize * (pageNumber - 1)).Take(pageSize).ToList();
            }
            var totalItemCount = products.Count;
            var paginationMetadata = new PaginationMetadata(
               totalItemCount, pageSize, pageNumber);
       
            if (orderby != null)
            {
                foreach (var item in orderby)
                {
                    var propertyInfo = typeof(Product).GetProperty(item, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
                    if (propertyInfo == null)
                    {
                        continue;
                    }
                    products = products.OrderBy(x => propertyInfo.GetValue(x, null)).Skip(pageSize * (pageNumber - 1))
                    .Take(pageSize)
                    .ToList();
                }
            }
            return (products.ToList(), paginationMetadata);
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

        public async Task UpdateProduct(string filePath, int ProductId, Product product)
        {
            Stream productsStream = GetJsonStream("JSON/Products.json");
            var products = await JsonSerializer.DeserializeAsync<List<Product>>(productsStream);

            var productToUpdateIndex = products.FindIndex(x => x.Id == ProductId);
            products[productToUpdateIndex] = product;
            var serializedData = JsonSerializer.Serialize(products);
            productsStream.Close();

            using var writer = new StreamWriter(filePath);
            await writer.WriteAsync(serializedData);
         
        }
        public async Task DeleteProduct(string filePath, int ProductId)
        {
            Stream productsStream = GetJsonStream("JSON/Products.json");
            var products = await JsonSerializer.DeserializeAsync<List<Product>>(productsStream);

            var productToDeleteIndex = products.FindIndex(x => x.Id == ProductId);
            products.RemoveAt(productToDeleteIndex);
            var serializedData = JsonSerializer.Serialize(products);
            productsStream.Close();

            using var writer = new StreamWriter(filePath);
            await writer.WriteAsync(serializedData);

        }
        //public async Task PartiallyUpdateProduct(string filePath, int ProductId, JsonPatchDocument<ProductForUpdateDto> patchObject)
        //{
        //    Stream productsStream = GetJsonStream("JSON/Products.json");
        //    var products = await JsonSerializer.DeserializeAsync<List<Product>>(productsStream);

        //    var productToUpdateIndex = products.FindIndex(x => x.Id == ProductId);
        //    products[productToUpdateIndex] = product;
        //    var serializedData = JsonSerializer.Serialize(products);
        //    productsStream.Close();

        //    using var writer = new StreamWriter(filePath);
        //    await writer.WriteAsync(serializedData);
        //}
    }
}
