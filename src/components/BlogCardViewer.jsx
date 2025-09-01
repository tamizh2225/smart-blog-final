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
  };

  const handleViewDetails = () => {
    navigate(`/blog/${blog.id}`);
  };

  return (
    <div className="bg-gradient-to-br from-purple-400 via-indigo-400 to-blue-400 rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transform transition border border-white/20">
      {/* Image */}
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-52 object-cover rounded-t-2xl"
          loading="lazy"
        />
      )}

      <div className="p-5 flex flex-col justify-between h-full">
        {/* Title */}
        <h3 className="text-2xl font-bold mb-2 text-white drop-shadow-lg">
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
                className="text-xs text-purple-200 bg-indigo-700/40 rounded-full px-2 py-1"
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
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleViewDetails}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-xl transition shadow-md"
          >
            🔍 View Details
          </button>

          <button
            onClick={handleLike}
            disabled={liked}
            className={`px-4 py-2 text-sm rounded-xl shadow-md transition ${
              liked
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-pink-500 hover:bg-pink-600 text-white"
            }`}
          >
            ❤️ {likes}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCardViewer;
