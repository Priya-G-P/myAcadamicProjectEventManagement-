using EventManagment.DataBase;
using EventManagment.Models;
using Microsoft.AspNetCore.Mvc;

namespace EventManagment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignupController : ControllerBase
    {
        SignupDB db = new SignupDB();

        [HttpPost("signup")]
        public IActionResult Signup([FromBody] User user)
        {
            var result = db.Signup(user);
            return Ok(result);
        }
        [HttpGet("getbyid/{id}")]
        public IActionResult GetById(int id)
        {
            SignupDB db = new SignupDB();
            var user = db.GetUserById(id);

            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            return Ok(user);
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] Login login)
        {
            var result = db.Login(login);

            if (result != null)
            {
                return Ok(new
                {
                    message = "Login Success",
                    email = result.email,
                    role = result.rolename,
                    userId=result.userId,
                    username = result.username
                });
            }

            return Unauthorized("Invalid Email or Password");
        }
    }
}