using Project2.Models;

namespace Project2
{
    public interface IProductRepository
    {
        Task<bool> ProductExist(int productId);
        Task<Product?> GetProductById(int productId);
        Task<IEnumerable<Product>> GetAllProductsAsync(int categoryId);
        Task Add(Product product);
        Task Update(Product product);
        void DeleteProduct(Product product);
        Task<bool> SaveChangesAsync();
    }
}
