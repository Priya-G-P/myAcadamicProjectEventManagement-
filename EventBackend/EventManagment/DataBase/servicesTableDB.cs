using EventManagment.Models;
using Microsoft.Data.SqlClient;
using System.Data;

namespace EventManagment.DataBase
{
    public class servicesTableDB
    {
        string connStr = "Data Source=Nuthan\\SQLEXPRESS;Initial Catalog=EventMangementSystem;Integrated Security=True;Trust Server Certificate=True";

        // ✅ ADD SERVICE (STORE IN imageurl_new)
        public bool AddService(servicesTablecs service)
        {
            using (SqlConnection conn = new SqlConnection(connStr))
            {
                conn.Open();

                string base64 = service.imageurl.Split(',')[1];
                byte[] bytes = Convert.FromBase64String(base64);

                string query = @"INSERT INTO ServicesTable 
                (ServicesCategoryid, imageurl_new, ServicesName, imageurl)
                VALUES (@catid, @img, @name, '')";

                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@catid", service.ServicesCategoryid);
                cmd.Parameters.Add("@img", SqlDbType.VarBinary).Value = bytes;
                cmd.Parameters.AddWithValue("@name", service.ServicesName);

                return cmd.ExecuteNonQuery() > 0;
            }
        }

        // ✅ GET ALL (READ FROM imageurl_new)
        public List<servicesTablecs> GetAllServices()
        {
            List<servicesTablecs> list = new List<servicesTablecs>();

            using (SqlConnection conn = new SqlConnection(connStr))
            {
                conn.Open();

                SqlCommand cmd = new SqlCommand("SELECT * FROM ServicesTable", conn);
                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    servicesTablecs s = new servicesTablecs();

                    s.Servicesid = Convert.ToInt32(reader["Servicesid"]);
                    s.ServicesCategoryid = Convert.ToInt32(reader["ServicesCategoryid"]);
                    s.ServicesName = reader["ServicesName"].ToString();

                    // ✅ SAFE CHECK
                    if (reader["imageurl_new"] != DBNull.Value)
                    {
                        byte[] bytes = (byte[])reader["imageurl_new"];
                        string base64 = Convert.ToBase64String(bytes);
                        s.imageurl = "data:image/jpeg;base64," + base64;
                    }
                    else
                    {
                        s.imageurl = "";
                    }

                    list.Add(s);
                }
            }

            return list;
        }

        // ✅ DELETE
        public bool DeleteService(int id)
        {
            using (SqlConnection conn = new SqlConnection(connStr))
            {
                conn.Open();

                string query = "DELETE FROM ServicesTable WHERE Servicesid=@id";

                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@id", id);

                return cmd.ExecuteNonQuery() > 0;
            }
        }
    }
}