using EventManagment.DataBase;
using EventManagment.Models;
using Microsoft.AspNetCore.Mvc;

namespace EventManagment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class servicesTableController : ControllerBase
    {
        servicesTableDB db = new servicesTableDB();

        [HttpPost("add")]
        public IActionResult Add([FromBody] servicesTablecs s)
        {
            return Ok(db.AddService(s));
        }

        [HttpGet("all")]
        public IActionResult GetAll()
        {
            return Ok(db.GetAllServices());
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            return Ok(db.DeleteService(id));
        }
    }
}