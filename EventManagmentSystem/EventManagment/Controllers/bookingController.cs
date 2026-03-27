using EventManagementproj.DataBase;
using EventManagementproj.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EventManagementproj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        [HttpPost("addBooking")]
        public IActionResult AddBooking([FromBody] BookingTable booking)
        {
            BookingDB db = new BookingDB();

            bool result = db.AddBooking(booking);

            if (result)
                return Ok("Booking Added Successfully");
            else
                return BadRequest("Failed");
        }

        [HttpGet("getAllBooking")]
        public IActionResult GetAllBookings()
        {
            BookingDB db = new BookingDB();
            var data = db.GetAllBookings();

            return Ok(data);
        }
        [HttpDelete("delete/{id}")]
        public IActionResult DeleteBooking(int id)
        {
            BookingDB db = new BookingDB();
            bool result = db.DeleteBooking(id);

            if (result)
                return Ok("Deleted");
            else
                return NotFound();
        }
        [HttpPut("updateStatus/{id}")]
        public IActionResult UpdateStatus(int id, [FromBody] string status)
        {
            BookingDB db = new BookingDB();
            bool result = db.UpdateStatus(id, status);

            if (result) return Ok();
            return BadRequest();
        }

    }
}