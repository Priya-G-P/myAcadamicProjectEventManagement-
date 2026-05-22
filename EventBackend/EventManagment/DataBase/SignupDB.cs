using EventManagment.Models;
using Microsoft.Data.SqlClient;
using System.Data;

namespace EventManagment.DataBase
{
    public class SignupDB
    {
        string connectionString =
            "Data Source=Nuthan\\SQLEXPRESS;Initial Catalog=EventMangementSystem;Integrated Security=True;Trust Server Certificate=True";

        // ✅ SIGNUP
        public int Signup(User user)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                string query = @"INSERT INTO signup(fullname, username, Email, password, phoneNumber)
                                 OUTPUT INSERTED.uid
                                 VALUES(@fullname, @username, @Email, @password, @phoneNumber)";

                SqlCommand cmd = new SqlCommand(query, con);

                cmd.Parameters.AddWithValue("@fullname", user.fullname);
                cmd.Parameters.AddWithValue("@username", user.username);
                cmd.Parameters.AddWithValue("@Email", user.Email);
                cmd.Parameters.AddWithValue("@password", user.password);
                cmd.Parameters.AddWithValue("@phoneNumber", user.phoneNumber);

                con.Open();
                return (int)cmd.ExecuteScalar();
            }
        }

        // ✅ LOGIN (NO SP)
        public LoginOut Login(Login login)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                string query = @"SELECT uid, fullname, role 
                                 FROM signup 
                                 WHERE Email = @Email AND password = @password";

                SqlCommand cmd = new SqlCommand(query, con);

                cmd.Parameters.AddWithValue("@Email", login.Email ?? "");
                cmd.Parameters.AddWithValue("@password", login.password ?? "");

                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.Read())
                {
                    return new LoginOut
                    {
                        userId = Convert.ToInt32(reader["uid"]),
                        fullname = reader["fullname"].ToString(),
                        rolename = (Convert.ToInt32(reader["role"]) == 1) ? "admin" : "user"
                    };
                }

                return null;
            }
        }

        // ✅ GET USER BY ID (already correct)
        public User GetUserById(int id)
        {
            User user = null;

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();

                string query = "SELECT * FROM signup WHERE uid = @id";

                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@id", id);

                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.Read())
                {
                    user = new User
                    {
                        uid = Convert.ToInt32(reader["uid"]),
                        fullname = reader["fullname"].ToString(),
                        username = reader["username"].ToString(),
                        Email = reader["Email"].ToString(),
                        password = reader["password"].ToString(),
                        phoneNumber = reader["phoneNumber"].ToString(),
                    };
                }
            }
            return user;
        }

        // ✅ COUNT
        public int GetUserCount()
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                string query = "SELECT COUNT(*) FROM signup";
                SqlCommand cmd = new SqlCommand(query, con);
                con.Open();
                return (int)cmd.ExecuteScalar();
            }
        }

        // ✅ GET ALL USERS
        public List<User> GetAllUsers()
        {
            List<User> users = new List<User>();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                string query = "SELECT uid, fullname, username, Email, role, phoneNumber FROM signup";
                SqlCommand cmd = new SqlCommand(query, con);

                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    users.Add(new User
                    {
                        uid = Convert.ToInt32(reader["uid"]),
                        fullname = reader["fullname"].ToString(),
                        username = reader["username"].ToString(),
                        Email = reader["Email"].ToString(),
                        phoneNumber = reader["phoneNumber"].ToString(),
                        role = Convert.ToInt32(reader["role"])
                    });
                }
            }

            return users;
        }

        // ✅ DELETE USER
        public bool DeleteUser(int id)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                string query = "DELETE FROM signup WHERE uid = @id";

                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@id", id);

                con.Open();
                return cmd.ExecuteNonQuery() > 0;
            }
        }
    }
}