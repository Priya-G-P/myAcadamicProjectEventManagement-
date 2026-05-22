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

            user.password = null; // ✅ HIDE PASSWORD
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
                    role = result.rolename,
                    userId = result.userId,
                    fullname = result.fullname
                });
            }

            return Unauthorized("Invalid Email or Password");
        } 

        [HttpGet("count")]
        public IActionResult GetUserCount()
        {
            SignupDB db = new SignupDB();
            return Ok(db.GetUserCount());
        }

        [HttpGet("getAll")]
        public IActionResult GetAllUsers()
        {
            SignupDB db = new SignupDB();
            var users = db.GetAllUsers();
            return Ok(users);
        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeleteUser(int id)
        {
            SignupDB db = new SignupDB();
            bool result = db.DeleteUser(id);
            if (result) return Ok("User Deleted Successfully");
            return NotFound("User not found");
        }
    }
}