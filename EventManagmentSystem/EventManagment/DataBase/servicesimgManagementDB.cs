using EventManagment.Models;
using Microsoft.Data.SqlClient;
using System.Data;

namespace EventManagment.DataBase
{
    public class ServicesimgManagementDB
    {
        string connectionString = "Data Source=Nuthan\\SQLEXPRESS;Initial Catalog=EventMangementSystem;Integrated Security=True;Trust Server Certificate=True";

        // ✅ ADD IMAGE
        public bool AddImage(ServicesimgManagement model)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();

                // 🔥 Convert Base64 → BYTE[]
                byte[] imageBytes = Convert.FromBase64String(model.ImageBase64);

                string query = "INSERT INTO ServiceManagement (Servicesid, image) VALUES (@sid, @img)";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@sid", model.Servicesid);
                    cmd.Parameters.Add("@img", SqlDbType.VarBinary).Value = imageBytes;

                    int rows = cmd.ExecuteNonQuery();
                    return rows > 0;
                }
            }
        }

        // ✅ GET ALL
        public List<ServicesimgManagement> GetAll()
        {
            List<ServicesimgManagement> list = new List<ServicesimgManagement>();

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();

                string query = "SELECT * FROM ServiceManagement";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        byte[] imgBytes = reader["image"] as byte[];

                        list.Add(new ServicesimgManagement
                        {
                            Servicesid = Convert.ToInt32(reader["Servicesid"]),
                            imageid = Convert.ToInt32(reader["ServiceManagementid"]),
                            ImageBase64 = imgBytes != null ? Convert.ToBase64String(imgBytes) : ""
                        });
                    }
                }
            }

            return list;
        }

        // ✅ DELETE
        public bool Delete(int id)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();

                string query = "DELETE FROM ServiceManagement WHERE ServiceManagementid=@id";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@id", id);
                    return cmd.ExecuteNonQuery() > 0;
                }
            }
        }
    }
}