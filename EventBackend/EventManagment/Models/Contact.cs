namespace EventManagment.Models
{
    public class Contact
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? EventType { get; set; }
        public string? Message { get; set; }
        public string? Status { get; set; }
        public string? CreatedAt { get; set; }
    }
}
