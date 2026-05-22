namespace EventManagment.Models
{
    public class ServicesimgManagement
    {
        
        public int Servicesid { get; set; }
        public int imageid { get; set; }

        // ✅ receive base64 from frontend
        public string ImageBase64 { get; set; }
    }
}