using EventManagment.DataBase;
using EventManagment.Models;
using Microsoft.AspNetCore.Mvc;
using System;

namespace EventManagment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        ReviewDB db = new ReviewDB();

        [HttpPost("add")]
        public IActionResult AddReview([FromBody] Review review)
        {
            try
            {
                if (review.Rating < 1 || review.Rating > 5)
                {
                    return BadRequest(new { message = "Rating must be between 1 and 5." });
                }

                if (string.IsNullOrWhiteSpace(review.ReviewText))
                {
                    return BadRequest(new { message = "Review text is required." });
                }

                bool result = db.AddReview(review);
                if (result)
                {
                    return Ok(new { message = "Review submitted successfully!" });
                }
                return StatusCode(500, new { message = "Failed to submit review." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while submitting the review.", error = ex.Message });
            }
        }

        [HttpGet("all")]
        public IActionResult GetAll()
        {
            return Ok(db.GetAllReviews(false));
        }

        [HttpGet("approved")]
        public IActionResult GetApproved()
        {
            return Ok(db.GetAllReviews(true));
        }

        [HttpPut("status/{id}")]
        public IActionResult UpdateStatus(int id, [FromBody] string status)
        {
            bool res = db.UpdateStatus(id, status);
            if(res) return Ok("Updated");
            return BadRequest("Failed");
        }
    }
}
