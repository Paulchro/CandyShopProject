using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project2.Dto;
using Project2.Interfaces;
using Project2.Models;
using Project2.Services;

namespace Project2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UsersController(IUserRepository userRepository)
        {
            
            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        }

        [HttpGet(Name = "GetAllUsers")]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
        {
            var users = await _userRepository.GetAllUsersAsync();

            return Ok(users);
        }

        [HttpGet("{id}", Name = "GetUserById")]
        public async Task<ActionResult<User>> GetUserById(int id)
        {
            var user = await _userRepository.GetUserById(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            var users = await _userRepository.GetAllUsersAsync();
            if (users != null && !users.Any(x => x.UserId == user.UserId))
            {
                await _userRepository.AddUser("JSON/Users.json",user);
                return CreatedAtAction("GetUserById", new { id = user.UserId }, user);
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpDelete("{userId}")]
        public async Task<ActionResult<User>> DeleteUser(int userid)
        {
            var users = await _userRepository.GetAllUsersAsync();
            var userToRemove = users.FirstOrDefault(x => x.UserId == userid);
            if (userToRemove != null)
            {
                await _userRepository.RemoveUser("JSON/Users.json", userToRemove);
                return NoContent();
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
