using EventManagment.Models;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using System;

namespace EventManagment.DataBase
{
    public class CateringDB
    {
        string connectionString = "Data Source=Nuthan\\SQLEXPRESS;Initial Catalog=EventMangementSystem;Integrated Security=True;TrustServerCertificate=True";

        // ✅ ADD ITEM
        public bool AddItem(CateringItem item)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "INSERT INTO CateringItems (Category, ItemName) VALUES (@category, @itemName)";
                SqlCommand cmd = new SqlCommand(query, conn);

                cmd.Parameters.AddWithValue("@category", item.Category ?? "");
                cmd.Parameters.AddWithValue("@itemName", item.ItemName ?? "");

                conn.Open();
                return cmd.ExecuteNonQuery() > 0;
            }
        }

        // ✅ GET BY CATEGORY
        public List<CateringItem> GetByCategory(string category)
        {
            List<CateringItem> list = new List<CateringItem>();

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "SELECT * FROM CateringItems WHERE Category = @category";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@category", category);

                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    list.Add(new CateringItem
                    {
                        Id = Convert.ToInt32(reader["Id"]),
                        Category = reader["Category"].ToString(),
                        ItemName = reader["ItemName"].ToString()
                    });
                }
            }

            return list;
        }

        // ✅ DELETE
        public bool Delete(int id)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "DELETE FROM CateringItems WHERE Id = @id";
                SqlCommand cmd = new SqlCommand(query, conn);

                cmd.Parameters.AddWithValue("@id", id);

                conn.Open();
                return cmd.ExecuteNonQuery() > 0;
            }
        }

        // ✅ UPDATE
        public bool UpdateItem(int id, string newItemName)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "UPDATE CateringItems SET ItemName = @newItemName WHERE Id = @id";
                SqlCommand cmd = new SqlCommand(query, conn);

                cmd.Parameters.AddWithValue("@newItemName", newItemName ?? "");
                cmd.Parameters.AddWithValue("@id", id);

                conn.Open();
                return cmd.ExecuteNonQuery() > 0;
            }
        }
    }
}

    
