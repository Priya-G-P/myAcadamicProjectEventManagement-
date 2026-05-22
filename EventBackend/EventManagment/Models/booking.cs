namespace EventManagementproj.Models
{
    public class BookingTable
    {
        public int Bookingid { get; set; }
        public int Uid { get; set; }

        public string UserName { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }

        public DateTime date { get; set; }

        public int numberofGuset { get; set; }
        public int numberofdays { get; set; }

        public string functionType { get; set; }

        public string image { get; set; }
        public string serviceName { get; set; }

        public string status { get; set; } = "Pending";

        // ✅ IMPORTANT
        public string cateringItems { get; set; } = "";
    }
}