using Project2.Models;

namespace Project2.Interfaces
{
    public interface IUserRepository
    {
        Task<bool> UserExist(int userId);
        Task<User?> GetUserById(int userId);
        Task<IEnumerable<User>?> GetAllUsersAsync();
        Task AddUser(string filePath, User user);
        Task RemoveUser(string filePath, User user);
    }
}
