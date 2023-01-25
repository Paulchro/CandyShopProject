using Microsoft.AspNetCore.Hosting;
using Microsoft.CodeAnalysis;
using Project2.Interfaces;
using Project2.Models;
using System.Linq;
using System.Text.Json;

namespace Project2.Services
{
    public class UsersRepository : IUserRepository
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        public UsersRepository(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }
        public async Task AddUser(string filePath, User user)
        {
            Stream usersStream = GetJsonStream("JSON/Users.json");
            var users = await JsonSerializer.DeserializeAsync<List<User>>(usersStream);

            users.Add(user);

            var serializedData = JsonSerializer.Serialize(users);
            usersStream.Close();

            using var writer = new StreamWriter(filePath);
            await writer.WriteAsync(serializedData);
        }

        public async Task<IEnumerable<User>?> GetAllUsersAsync()
        {
            Stream usersStream = GetJsonStream("JSON/Users.json");

            var users = await JsonSerializer.DeserializeAsync<List<User>>(usersStream);

            usersStream.Close();
            if (users != null)
            {
                return users.ToList();
            }
            return null;
        }

        public async Task<User?> GetUserById(int userId)
        {
            Stream usersStream = GetJsonStream("JSON/Users.json");
            var users = await JsonSerializer.DeserializeAsync<List<User>>(usersStream);
           
            var userToReturn = users.FirstOrDefault(x => x.UserId == userId);
            usersStream.Close();

            if (userToReturn != null)
            {
                return userToReturn;
            }

            return null;
        }

        public async Task<IEnumerable<UserRole>?> GetAllUserRoles()
        {
            Stream userRolesStream = GetJsonStream("JSON/UserRoles.json");

            var userRolesList = await JsonSerializer.DeserializeAsync<List<UserRole>>(userRolesStream);

            userRolesStream.Close();
            if (userRolesList != null)
            {
                return userRolesList.ToList();
            }
            return null;
        }

        public async Task RemoveUser(string filePath, User user)
        {
            Stream usersStream = GetJsonStream("JSON/Users.json");
            var users = await JsonSerializer.DeserializeAsync<List<User>>(usersStream);
            if (users != null)
            {
                users.Remove(users.FirstOrDefault(x=>x.UserId == user.UserId));
            }

            var serializedData = JsonSerializer.Serialize(users);
            usersStream.Close();

            using var writer = new StreamWriter(filePath);
            await writer.WriteAsync(serializedData);
        }

        public async Task<bool> UserExist(int userId)
        {
            Stream usersStream = GetJsonStream("JSON/Users.json");
            var users = await JsonSerializer.DeserializeAsync<List<User>>(usersStream);
            usersStream.Close();
            return users.Any(c => c.UserId == userId);
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
