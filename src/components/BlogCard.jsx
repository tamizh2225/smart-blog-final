import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteBlog } from "../api/blogApi"; // Make sure this exists

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
        // Optionally reload or refetch blogs (depends on parent component)
        window.location.reload(); // temporary shortcut if no callback
      } catch (err) {
        alert("Failed to delete blog.");
        console.error(err);
      }
    }
  };

  return (
    <div className="bg-white rounded shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer">
      {/* Blog Image */}
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      )}

      <div className="p-4">
        {/* Title */}
        <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>

        {/* Subject */}
        <p className="text-gray-700 mb-3 line-clamp-3">{blog.subject}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {blog.tag &&
            blog.tag.split(",").map((t, i) => (
              <span
                key={i}
                className="text-xs bg-blue-100 text-blue-700 rounded-full px-2 py-1"
              >
                #{t.trim()}
              </span>
            ))}
        </div>

        {/* Date */}
        <p className="text-gray-500 text-sm mb-4">
          🕓 {new Date(blog.createdAt).toLocaleDateString()}
        </p>

        {/* Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={handleViewDetails}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
          >
            🔍 View Details
          </button>

          {posterName === blog.author && (
            <>
              <button
                onClick={handleEdit}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
              >
                ✏️ Edit
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
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
