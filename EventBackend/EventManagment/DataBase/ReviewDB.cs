using Microsoft.Data.SqlClient;
using EventManagment.Models;
using System;
using System.Collections.Generic;

namespace EventManagment.DataBase
{
    public class ReviewDB
    {
        string connectionString = "Data Source=Nuthan\\SQLEXPRESS;Initial Catalog=EventMangementSystem;Integrated Security=True;Trust Server Certificate=True";

        // ✅ ADD REVIEW
        public bool AddReview(Review review)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                string query = @"INSERT INTO Reviews(UserId, Rating, ReviewText, ReviewDate, Status)
                                 VALUES(@UserId, @Rating, @ReviewText, GETDATE(), 'Pending')";

                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@UserId", review.UserId);
                cmd.Parameters.AddWithValue("@Rating", review.Rating);
                cmd.Parameters.AddWithValue("@ReviewText", review.ReviewText ?? "");

                con.Open();
                int rowsAffected = cmd.ExecuteNonQuery();
                return rowsAffected > 0;
            }
        }

        // ✅ GET ALL REVIEWS
        public List<Review> GetAllReviews(bool onlyApproved = false)
        {
            List<Review> list = new List<Review>();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                string query = @"SELECT r.*, s.fullname 
                                 FROM Reviews r 
                                 JOIN signup s ON r.UserId = s.uid";

                if (onlyApproved)
                {
                    query += " WHERE r.Status = 'Approved'";
                }

                query += " ORDER BY r.ReviewId DESC";

                SqlCommand cmd = new SqlCommand(query, con);
                con.Open();

                SqlDataReader dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    list.Add(new Review
                    {
                        ReviewId = Convert.ToInt32(dr["ReviewId"]),
                        UserId = Convert.ToInt32(dr["UserId"]),
                        Rating = Convert.ToInt32(dr["Rating"]),
                        ReviewText = dr["ReviewText"].ToString(),
                        ReviewDate = Convert.ToDateTime(dr["ReviewDate"]),
                        Status = dr["Status"] != DBNull.Value ? dr["Status"].ToString() : "Pending",
                        UserName = dr["fullname"].ToString()
                    });
                }
            }

            return list;
        }

        // ✅ UPDATE STATUS
        public bool UpdateStatus(int reviewId, string status)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                string query = "UPDATE Reviews SET Status = @Status WHERE ReviewId = @Id";

                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@Status", status);
                cmd.Parameters.AddWithValue("@Id", reviewId);

                con.Open();
                return cmd.ExecuteNonQuery() > 0;
            }
        }

        // ✅ DELETE REVIEW (FINAL CORRECT VERSION)
        public bool DeleteReview(int reviewId)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                string query = "DELETE FROM Reviews WHERE ReviewId = @ReviewId";

                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@ReviewId", reviewId);

                con.Open();
                int rowsAffected = cmd.ExecuteNonQuery();

                return rowsAffected > 0;
            }
        }
    }
}