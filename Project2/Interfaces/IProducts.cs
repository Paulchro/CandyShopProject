﻿using Project2.Models;

namespace Project2
{
    public interface IProducts
    {
        Task<bool> ProductExist(int cityId);
        Task<Product?> GetProductById(int productId);
        Task<IEnumerable<Product>> GetAllProductsAsync();
        Task<IEnumerable<Product>> GetProductsByCategoryAsync(int categoryid);
        Task Add(Product product);
        Task Update(Product product);
        Task Remove(Product product);
        Task<bool> SaveChangesAsync();

    }
}
