using EventManagementproj.Models;
using Microsoft.Data.SqlClient;

namespace EventManagementproj.DataBase
{
    public class BookingDB
    {
        string connectionString =
            "Data Source=localhost\\SQLEXPRESS;Initial Catalog=EventMangementSystem;Integrated Security=True;TrustServerCertificate=True";

        public bool AddBooking(BookingTable booking)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();

                string query = @"INSERT INTO Booking 
(uid, fullName, phoneNumber, address, date, 
 numberOfGuest, numberOfDays, functionTypes, image, serviceName, status)
VALUES 
(@uid, @fullName, @phoneNumber, @address, @date, 
 @numberOfGuest, @numberOfDays, @functionTypes, @image, @serviceName, @status)";

                SqlCommand cmd = new SqlCommand(query, conn);

                // 🔥 IMAGE CONVERSION
                byte[] imageBytes = null;

                if (!string.IsNullOrEmpty(booking.image))
                {
                    var base64 = booking.image.Contains(",")
                        ? booking.image.Split(',')[1]
                        : booking.image;

                    imageBytes = Convert.FromBase64String(base64);
                }

                cmd.Parameters.AddWithValue("@uid", booking.Uid);
                cmd.Parameters.AddWithValue("@fullName", booking.UserName ?? "");
                cmd.Parameters.AddWithValue("@phoneNumber", booking.PhoneNumber ?? "");
                cmd.Parameters.AddWithValue("@address", booking.Address ?? "");
                cmd.Parameters.AddWithValue("@date", booking.date);
                cmd.Parameters.AddWithValue("@numberOfGuest", booking.numberofGuset);
                cmd.Parameters.AddWithValue("@numberOfDays", booking.numberofdays);
                cmd.Parameters.AddWithValue("@functionTypes", booking.functionType ?? "");
                cmd.Parameters.AddWithValue("@image", (object?)imageBytes ?? DBNull.Value);
                cmd.Parameters.AddWithValue("@serviceName", booking.serviceName ?? "");
                cmd.Parameters.AddWithValue("@status", booking.status ?? "Pending");

                return cmd.ExecuteNonQuery() > 0;
            }
        }

        // 🔥 GET ALL BOOKINGS
        public List<BookingTable> GetAllBookings()
        {
            List<BookingTable> list = new List<BookingTable>();

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();

                SqlCommand cmd = new SqlCommand("SELECT * FROM Booking", conn);
                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    byte[] imgData = reader["image"] as byte[];

                    string base64Image = null;

                    if (imgData != null)
                    {
                        base64Image = $"data:image/jpeg;base64,{Convert.ToBase64String(imgData)}";
                    }

                    list.Add(new BookingTable
                    {
                        Bookingid = Convert.ToInt32(reader["BookingId"]),
                        Uid = Convert.ToInt32(reader["uid"]),
                        UserName = reader["fullName"].ToString(),
                        PhoneNumber = reader["phoneNumber"].ToString(),
                        Address = reader["address"].ToString(),
                        date = Convert.ToDateTime(reader["date"]),
                        numberofGuset = Convert.ToInt32(reader["numberOfGuest"]),
                        numberofdays = Convert.ToInt32(reader["numberOfDays"]),
                        functionType = reader["functionTypes"].ToString(),
                        status = reader["status"].ToString(),
                        image = base64Image,
                        serviceName = reader["serviceName"].ToString(),
                    });
                }
            }

            return list;
        }

        public bool DeleteBooking(int id)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();

                string query = "DELETE FROM Booking WHERE BookingId=@id";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@id", id);

                return cmd.ExecuteNonQuery() > 0;
            }
        }

        public bool UpdateStatus(int id, string status)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();

                string query = "UPDATE Booking SET status=@status WHERE BookingId=@id";

                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@status", status);
                cmd.Parameters.AddWithValue("@id", id);

                return cmd.ExecuteNonQuery() > 0;
            }
        }
    }
}