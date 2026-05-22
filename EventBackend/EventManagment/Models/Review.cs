using System;

namespace EventManagment.Models
{
    public class Review
    {
        public int ReviewId { get; set; }
        public int UserId { get; set; }
        public int Rating { get; set; }
        public string? ReviewText { get; set; }
        public DateTime ReviewDate { get; set; }
        public string? Status { get; set; }  // 'Pending' or 'Approved'
        public string? UserName { get; set; } // joined from signup table
    }
}
