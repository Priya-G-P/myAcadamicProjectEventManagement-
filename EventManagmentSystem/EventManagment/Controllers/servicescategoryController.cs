using EventManagment.DataBase;
using EventManagment.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace EventManagment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class servicescategoryController : ControllerBase
    {
            [HttpPost("AddCategory")]
            public IActionResult AddCategory(servicescategory category)
            {
                ServicescategoryDB db = new ServicescategoryDB();
                bool result = db.AddCategory(category.Servicescategoryname);

                if (result)
                {
                    return Ok("Category Added Successfully");
                }
                else
                {
                    return BadRequest("Failed to Add Category");
                }
            }
            [HttpGet("GetAll")]
            public IActionResult GetAll()
            {
                ServicescategoryDB db = new ServicescategoryDB();
                var data = db.GetAll();

                return Ok(data);
            }
        [HttpDelete("delete/{id}")]
        public IActionResult DeleteCategory(int id)
        {
            ServicescategoryDB db = new ServicescategoryDB();

            bool result = db.DeleteCategory(id);

            if (result)
            {
                return Ok("Category Deleted Successfully");
            }
            else
            {
                return NotFound("Category Not Found");
            }
        }
    }
}
