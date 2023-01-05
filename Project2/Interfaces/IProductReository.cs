using Microsoft.AspNetCore.Mvc;
using Project2.Models;

namespace Project2
{
    public interface IProductRepository
    {
        Task<bool> ProductExist(int productId);
        Task<Product?> GetProductById(int productId);
        Task<IEnumerable<Product>?> GetAllProductsAsync();
        Task AddProduct(string filePath, Product product);
    }
}
