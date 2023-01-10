using Project2.Models;

namespace Project2.Interfaces
{
    public interface ICategoryRepository
    {
        Task<bool> CategoryExists(int categoryId);
        Task<Category?> GetCategoryById(int categoryId);
        Task<IEnumerable<Category>?> GetAllCategoriesAsync();
        Task AddCategory(string filePath, Category category);
    }
}
