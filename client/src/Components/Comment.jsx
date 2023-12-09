import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { useCookies } from "react-cookie";

function Comment() {
  const [cookies] = useCookies(["token"]);
  const [commentData, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();
  const token = cookies.Token;
  const { headers } = useAuth();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        console.log("Workshop ID:", id);
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(
          `http://localhost:8080/course/${id}/getcomments`
        );

        setComments(response.data);
        console.log("API response:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchComments();
  }, [id]);

  const addComment = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/course/${id}/addcomment`,
        {
          comment: newComment,
        }
      );
      console.log("Comment added:", response.data);

      setNewComment(""); // Clear the input field after posting comment
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  return (
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Reviews
          </h2>
        </div>
        <form
          className="mb-6"
          onSubmit={(e) => {
            e.preventDefault();
            addComment();
          }}
        >
          <div className="mb-4">
            <textarea
              rows="6"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-4 text-sm text-gray-900 border rounded-lg focus:outline-none dark:text-white dark:bg-gray-800"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="inline-block px-6 py-3 text-xs font-medium text-white bg-primary-700 rounded-lg focus:outline-none hover:bg-primary-800"
          >
            Post comment
          </button>
        </form>
        {commentData &&
        commentData.comments &&
        commentData.comments.length > 0 ? (
          commentData.comments.map((comment) => (
            <article
              key={comment.id}
              className="p-6 mb-6 bg-white rounded-lg shadow-md dark:bg-gray-900"
            >
              <div className="flex lg:flex-row gap-4">
                <img
                  src={comment.image}
                  alt={``}
                  className="w-8 h-8 rounded-full "
                />

                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  {comment.user_name}
                </p>
              </div>
              <p className="text-gray-700 mx-14 mt-4 dark:text-gray-300">
                {comment.course_comment}
              </p>
            </article>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </section>
  );
}

export default Comment;
