using EventManagment.DataBase;
using EventManagment.Models;
using Microsoft.AspNetCore.Mvc;

namespace EventManagment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServicesimgManagementController : ControllerBase
    {
        ServicesimgManagementDB db = new ServicesimgManagementDB();

        // ✅ ADD
        [HttpPost("add")]
        public IActionResult Add([FromBody] ServicesimgManagement model)
        {
            if (db.AddImage(model))
                return Ok("Inserted");
            else
                return BadRequest("Failed");
        }

        // ✅ GET ALL (IMPORTANT NAME = all)
        [HttpGet("all")]
        public IActionResult GetAll()
        {
            return Ok(db.GetAll());
        }

        // ✅ DELETE
        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            if (db.Delete(id))
                return Ok("Deleted");
            else
                return BadRequest("Failed");
        }
    }
}