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
            try
            {
                BookingDB db = new BookingDB();
                bool result = db.AddBooking(booking);

                if (result)
                    return Ok("Booking Added Successfully");
                else
                    return BadRequest("Insert Failed");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message); // 🔥 DEBUG ERROR
            }
        }

        [HttpGet("getAllBooking")]
        public IActionResult GetAllBookings()
        {
            BookingDB db = new BookingDB();
            var data = db.GetAllBookings();
            return Ok(data);
        }

        [HttpGet("user/{uid}")]
        public IActionResult GetByUserId(int uid)
        {
            BookingDB db = new BookingDB();
            var data = db.GetBookingsByUserId(uid);
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