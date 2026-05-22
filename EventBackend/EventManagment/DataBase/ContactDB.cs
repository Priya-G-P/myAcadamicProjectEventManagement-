using Microsoft.Data.SqlClient;
using EventManagment.Models;
using System;
using System.Collections.Generic;

namespace EventManagment.DataBase
{
    public class ContactDB
    {
        string connectionString = "Data Source=Nuthan\\SQLEXPRESS;Initial Catalog=EventMangementSystem;Integrated Security=True;TrustServerCertificate=True";

        public bool AddContact(Contact contact)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                string query = "INSERT INTO Contacts (Name, Email, EventType, Message, Status, CreatedAt) VALUES (@Name, @Email, @EventType, @Message, 'New', GETDATE())";
                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@Name", contact.Name ?? "");
                cmd.Parameters.AddWithValue("@Email", contact.Email ?? "");
                cmd.Parameters.AddWithValue("@EventType", contact.EventType ?? "");
                cmd.Parameters.AddWithValue("@Message", contact.Message ?? "");
                
                con.Open();
                int i = cmd.ExecuteNonQuery();
                return i > 0;
            }
        }

        public List<Contact> GetAllContacts()
        {
            List<Contact> list = new List<Contact>();
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand("SELECT * FROM Contacts ORDER BY Id DESC", con);
                con.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    list.Add(new Contact
                    {
                        Id = Convert.ToInt32(dr["Id"]),
                        Name = dr["Name"].ToString(),
                        Email = dr["Email"].ToString(),
                        EventType = dr["EventType"].ToString(),
                        Message = dr["Message"].ToString(),
                        Status = dr["Status"].ToString(),
                        CreatedAt = dr["CreatedAt"].ToString()
                    });
                }
            }
            return list;
        }

        public bool UpdateStatus(int id, string status)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand("UPDATE Contacts SET Status = @Status WHERE Id = @Id", con);
                cmd.Parameters.AddWithValue("@Status", status);
                cmd.Parameters.AddWithValue("@Id", id);
                con.Open();
                int i = cmd.ExecuteNonQuery();
                return i > 0;
            }
        }
    }
}
