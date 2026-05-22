using EventManagment.Models;
using Microsoft.Data.SqlClient;
using System.Data;

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

                SqlCommand cmd = new SqlCommand("sp_AddServiceCategory", conn);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@CategoryName", servicescategoryname);

                int rows = cmd.ExecuteNonQuery();
                return rows > 0;
            }
        }
        public List<servicescategory> GetAll()
        {
            List<servicescategory> list = new List<servicescategory>();

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlCommand cmd = new SqlCommand("sp_GetServiceCategories", conn);
                cmd.CommandType = CommandType.StoredProcedure;

                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    servicescategory c = new servicescategory
                    {
                        Servicescategoryid = Convert.ToInt32(reader["Servicescategoryid"]),
                        Servicescategoryname = reader["Servicescategoryname"].ToString()
                    };

                    list.Add(c);
                }
            }

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

        public int GetCategoryCount()
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                string query = "SELECT COUNT(*) FROM ServicesCategory";
                SqlCommand cmd = new SqlCommand(query, conn);
                conn.Open();
                return (int)cmd.ExecuteScalar();
            }
        }
    }
}
