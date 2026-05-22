namespace EventManagment.Models
{
    public class LoginOut
    {
        public int userId { get; set; }
        public string username { get; set; }
        public string email { get; set; }
        public string fullname { get; set; }
        public string rolename { get; set; }

        public string phoneNumber { get; set; }   // ✅ ADD THIS
    }
}
