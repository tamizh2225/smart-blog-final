import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TagList from "../components/TagList";
import CommentBox from "../components/CommentBox";

const BlogDetailViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/blogs/${id}`)
      .then((res) => {
        setBlog(res.data);
        setError(null);
      })
      .catch((err) => {
        console.error("Failed to load blog:", err);
        setError("Failed to load blog. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleGoBack = () => {
    const role = localStorage.getItem("activeRole");
    if (role === "poster") {
      navigate("/poster-home");
    } else {
      navigate("/viewer-home");
    }
  };

  if (loading)
    return (
      <p className="text-center mt-16 text-xl text-gray-500 animate-pulse">
        Loading blog...
      </p>
    );

  if (error)
    return (
      <p className="text-center mt-16 text-red-500 font-semibold">{error}</p>
    );

  if (!blog) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
        {blog.title}
      </h1>

      {/* Banner Image */}
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-72 sm:h-96 object-cover rounded-md mb-8 shadow-md"
          loading="lazy"
        />
      )}

      {/* Subject */}
      {blog.subject && (
        <p className="text-lg italic text-indigo-600 mb-4">{blog.subject}</p>
      )}

      {/* Full Content */}
      <div className="prose prose-indigo max-w-none text-gray-800 whitespace-pre-wrap mb-6">
        {blog.content}
      </div>

      {/* Created Date */}
      <p className="text-sm text-gray-500 mb-6">
        🕒 Published on{" "}
        {new Date(blog.createdAt).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </p>

      {/* Tags */}
      <TagList tags={blog.tags || []} />

      {/* Comments Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">💬 Comments</h2>
        <CommentBox blogId={id} />
      </div>
      {/* 🔙 Go Back Button */}
      <button
        onClick={handleGoBack}
        className="fixed bottom-6 right-6 bg-gray-800 text-white px-5 py-3 rounded-full shadow-lg hover:bg-gray-700 hover:scale-105 transition-all duration-300 ease-in-out"
      >
        ← Go Back
      </button>
    </div>
  );
};

export default BlogDetailViewer;
