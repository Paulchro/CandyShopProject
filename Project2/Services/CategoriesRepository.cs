using CandyShop2.DAL;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Project2.Interfaces;
using Project2.Models;
using System.Text.Json;

namespace Project2.Services
{
    public class CategoriesRepository : ICategoryRepository
    {
        
        private readonly IWebHostEnvironment _webHostEnvironment;
        public CategoriesRepository( IWebHostEnvironment webHostEnvironment)
        {
           
            _webHostEnvironment = webHostEnvironment;
        }

        public Task AddCategory(string filePath, Category category)
        {
            throw new NotImplementedException();
        }

        public Task<bool> CategoryExists(int categoryId)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Category>?> GetAllCategoriesAsync()
        {
            Stream categoriesStream = GetJsonStream("JSON/Categories.json");

            var categories = await JsonSerializer.DeserializeAsync<List<Category>>(categoriesStream);

            categoriesStream.Close();
            if (categories != null)
            {
                return categories.ToList();
            }
            return null;
        }

        public Task<Category?> GetCategoryById(int categoryId)
        {
            throw new NotImplementedException();
        }

        private Stream GetJsonStream(string path)
        {
            string contentRootPath = _webHostEnvironment.ContentRootPath;
            string completePath = "";
            completePath = Path.Combine(contentRootPath, path);

            return new FileStream(completePath, FileMode.Open, FileAccess.Read);
        }

       
    }
}
