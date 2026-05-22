using Microsoft.AspNetCore.Mvc;
using EventManagment.DataBase;
using EventManagment.Models;

namespace EventManagment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CateringController : ControllerBase
    {
        CateringDB db = new CateringDB();

        // ✅ ADD STARTER
        [HttpPost("add-starter")]
        public IActionResult AddStarter([FromBody] CateringItem item)
        {
            item.Category = "Starter";
            return Ok(db.AddItem(item));
        }

        // ✅ ADD MAIN COURSE
        [HttpPost("add-maincourse")]
        public IActionResult AddMain([FromBody] CateringItem item)
        {
            item.Category = "MainCourse";
            return Ok(db.AddItem(item));
        }

        // ✅ ADD DESSERT
        [HttpPost("add-dessert")]
        public IActionResult AddDessert([FromBody] CateringItem item)
        {
            item.Category = "Dessert";
            return Ok(db.AddItem(item));
        }

        // ✅ GET STARTERS
        [HttpGet("starters")]
        public IActionResult GetStarters()
        {
            return Ok(db.GetByCategory("Starter"));
        }

        // ✅ GET MAIN COURSE
        [HttpGet("maincourse")]
        public IActionResult GetMain()
        {
            return Ok(db.GetByCategory("MainCourse"));
        }

        // ✅ GET DESSERTS
        [HttpGet("desserts")]
        public IActionResult GetDesserts()
        {
            return Ok(db.GetByCategory("Dessert"));
        }

        // ✅ DELETE ITEM
        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            return Ok(db.Delete(id));
        }

        // ✅ UPDATE ITEM
        [HttpPut("update/{id}")]
        public IActionResult Update(int id, [FromBody] CateringItem item)
        {
            return Ok(db.UpdateItem(id, item.ItemName));
        }
    }
}