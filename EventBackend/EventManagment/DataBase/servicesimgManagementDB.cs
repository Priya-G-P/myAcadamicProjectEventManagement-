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

                byte[] imageBytes = Convert.FromBase64String(model.ImageBase64);

                using (SqlCommand cmd = new SqlCommand("sp_AddServiceImage", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@Servicesid", model.Servicesid);
                    cmd.Parameters.Add("@image", SqlDbType.VarBinary).Value = imageBytes;

                    return cmd.ExecuteNonQuery() > 0;
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

                using (SqlCommand cmd = new SqlCommand("sp_GetServiceImages", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

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
            }

            return list;
        }

        // ✅ DELETE
        public bool Delete(int id)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();

                using (SqlCommand cmd = new SqlCommand("sp_DeleteServiceImage", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@id", id);

                    return cmd.ExecuteNonQuery() > 0;
                }
            }
        }
    }
}