using Project2.Models;

namespace Project2.Interfaces
{
    public interface ICategoryRepository
    {
        Task<bool> CategoryExists(int categoryId);
        Task<IEnumerable<Category>> GetCategories();
        Task<Category> GetCategoryById(int categoryId);

        Task Add(Category category);
        Task Update(Category category);
        Task Remove(Category category);

        Task<bool> SaveChangesAsync();
    }
}
