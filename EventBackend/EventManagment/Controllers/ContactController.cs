using Microsoft.AspNetCore.Mvc;
using EventManagment.DataBase;
using EventManagment.Models;

namespace EventManagment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        ContactDB db = new ContactDB();

        [HttpPost("add")]
        public IActionResult AddContact([FromBody] Contact contact)
        {
            bool res = db.AddContact(contact);
            if (res) return Ok("Message received");
            return BadRequest("Failed");
        }

        [HttpGet("all")]
        public IActionResult GetAll()
        {
            return Ok(db.GetAllContacts());
        }

        [HttpPut("status/{id}")]
        public IActionResult UpdateStatus(int id, [FromBody] string status)
        {
            bool res = db.UpdateStatus(id, status);
            if (res) return Ok("Status updated");
            return BadRequest("Failed");
        }
    }
}
