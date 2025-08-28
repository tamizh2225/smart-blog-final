import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BlogCardViewer = ({ blog }) => {
  const navigate = useNavigate();
  const [likes, setLikes] = useState(blog.likes || 0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs")) || {};
    if (likedBlogs[blog.id]) setLiked(true);
  }, [blog.id]);

  const handleLike = () => {
    if (liked) return;

    const updatedLikes = likes + 1;
    setLikes(updatedLikes);
    setLiked(true);

    const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs")) || {};
    likedBlogs[blog.id] = true;
    localStorage.setItem("likedBlogs", JSON.stringify(likedBlogs));

    // Optional: Send update to backend if needed
  };

  const handleViewDetails = () => {
    navigate(`/blog/${blog.id}`);
  };

  return (
    <div className="bg-white rounded shadow-md overflow-hidden hover:shadow-xl transition">
      {/* Image */}
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

          <button
            onClick={handleLike}
            disabled={liked}
            className={`${
              liked
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-pink-500 hover:bg-pink-600"
            } text-white px-3 py-1 rounded transition`}
          >
            ❤️ {likes}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCardViewer;
