using Microsoft.Data.SqlClient;
using EventManagment.Models;

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

        // ✅ LOGIN
        public LoginOut Login(Login login)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                string query = @"SELECT uid, username, Email, role 
                                 FROM signup
                                 WHERE Email=@Email AND password=@password";

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
                        username = reader["username"].ToString(),
                        email = reader["Email"].ToString(),
                        rolename = Convert.ToInt32(reader["role"]) == 0 ? "user" : "admin"
                    };
                }

                return null;
            }
        }
    }
}