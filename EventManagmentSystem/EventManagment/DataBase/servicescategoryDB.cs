using EventManagment.Models;
using Microsoft.Data.SqlClient;

namespace EventManagment.DataBase
{
        public class ServicescategoryDB
        {
            private readonly string _connectionString =
                "Data Source=Nuthan\\SQLEXPRESS;Initial Catalog=EventMangementSystem;Integrated Security=True;Trust Server Certificate=True";

            public bool AddCategory(string servicescategoryname)
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    conn.Open();

                    string query = "INSERT INTO ServicesCategory (servicescategoryname) VALUES (@name)";

                    using (SqlCommand cmd = new SqlCommand(query, conn))
                    {
                        cmd.Parameters.AddWithValue("@name", servicescategoryname);

                        int rows = cmd.ExecuteNonQuery();
                        return rows > 0;
                    }
                }
            }
            public List<servicescategory> GetAll()
            {
                List<servicescategory> list = new List<servicescategory>();

                SqlConnection conn = new SqlConnection(_connectionString);
                conn.Open();

                SqlCommand cmd = new SqlCommand("SELECT * FROM ServicesCategory", conn);
                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    servicescategory c = new servicescategory();
                    c.Servicescategoryid = Convert.ToInt32(reader["Servicescategoryid"]);
                    c.Servicescategoryname = reader["Servicescategoryname"].ToString();

                    list.Add(c);
                }

                conn.Close();
                return list;
            }
        public bool DeleteCategory(int id)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                string query = "DELETE FROM ServicesCategory WHERE Servicescategoryid=@id";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@id", id);

                    int rows = cmd.ExecuteNonQuery();
                    return rows > 0;
                }
            }
        }

    }
}
