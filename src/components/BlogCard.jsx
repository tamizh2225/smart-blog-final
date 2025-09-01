import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteBlog } from "../api/blogApi";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const posterName = localStorage.getItem("posterName");

  const handleViewDetails = () => {
    navigate(`/blog/${blog.id}`);
  };

  const handleEdit = () => {
    navigate(`/edit-blog/${blog.id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteBlog(blog.id);
        alert("Blog deleted successfully!");
        window.location.reload();
      } catch (err) {
        alert("Failed to delete blog.");
        console.error(err);
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-400 via-indigo-400 to-blue-400 rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transform transition cursor-pointer border border-white/20">
      {/* Blog Image */}
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-48 object-cover rounded-t-2xl"
          loading="lazy"
        />
      )}

      <div className="p-5 flex flex-col justify-between h-full">
        {/* Title */}
        <h3 className="text-xl font-bold mb-2 text-white drop-shadow-lg">
          {blog.title}
        </h3>

        {/* Subject */}
        <p className="text-indigo-100 mb-3 line-clamp-3">{blog.subject}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {blog.tag &&
            blog.tag.split(",").map((t, i) => (
              <span
                key={i}
                className="text-purple-200 bg-indigo-700/40 text-white rounded-full px-2 py-1"
              >
                #{t.trim()}
              </span>
            ))}
        </div>

        {/* Date */}
        <p className="text-white/70 text-sm mb-4">
          🕓 {new Date(blog.createdAt).toLocaleDateString()}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleViewDetails}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-xl transition"
          >
            🔍 View Details
          </button>

          {posterName === blog.author && (
            <>
              <button
                onClick={handleEdit}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-xl transition"
              >
                ✏️ Edit
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-xl transition"
              >
                🗑️ Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
