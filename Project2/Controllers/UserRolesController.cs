using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project2.Interfaces;
using Project2.Models;

namespace Project2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserRolesController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UserRolesController(IUserRepository userRepository)
        {
            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        }
        [HttpGet(Name = "GetAllRoles")]
        public async Task<ActionResult<IEnumerable<UserRole>>> GetAllRoles()
        {
            var userRoles = await _userRepository.GetAllUserRoles();

            return Ok(userRoles);
        }
    }
}
