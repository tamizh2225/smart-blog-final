import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById, updateBlog } from "../api/blogApi";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [author, setAuthor] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  // ✅ Fetch Blog by ID
  useEffect(() => {
    getBlogById(id)
      .then((res) => {
        const blog = res.data;
        setTitle(blog.title || "");
        setSubject(blog.subject || "");
        setContent(blog.content || "");
        setTags(blog.tag || "");
        setImageUrl(blog.image || "");
        setAuthor(blog.author || "");
        setCreatedAt(blog.createdAt || new Date().toISOString());
      })
      .catch(() => {
        alert("Failed to load blog. Please try again.");
        navigate("/poster");
      });
  }, [id, navigate]);

  // ✅ Update Handler
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!title || !subject || !content) {
      alert("Title, Subject, and Content are required.");
      return;
    }

    const updatedBlog = {
      title,
      subject,
      content,
      tag: tags,
      image: imageUrl,
      author,
      createdAt,
    };

    try {
      setLoading(true);
      await updateBlog(id, updatedBlog);
      navigate("/poster-home", {
        state: { successMessage: "Blog updated successfully!" },
      });
    } catch {
      alert("Failed to update blog.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/poster-home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-blue-600 text-white p-6">
      <div
        className="max-w-3xl mx-auto p-6 mt-8 
      bg-gradient-to-br from-indigo-500 via-purple-600 to-blue-600 text-white p-6 
      rounded-2xl shadow-lg border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          ✏️ Edit Blog
        </h2>

        <form onSubmit={handleUpdate} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:outline-none text-black
              focus:ring-2 focus:ring-indigo-400 shadow-sm"
              required
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Subject
            </label>
            <textarea
              rows={3}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:outline-none text-black
              focus:ring-2 focus:ring-indigo-400 shadow-sm"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:outline-none text-black
              focus:ring-2 focus:ring-indigo-400 shadow-sm"
              required
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:outline-none text-black
              focus:ring-2 focus:ring-indigo-400 shadow-sm"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full border px-3 py-2 rounded focus:outline-none 
              focus:ring-2 focus:ring-indigo-400 shadow-sm"
            />
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-48 object-cover rounded-md mt-2"
                onError={(e) => {
                  e.target.src = "/placeholder.png";
                }}
              />
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 
              text-white px-6 py-2 rounded shadow-md hover:opacity-90 
              transition disabled:opacity-50 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg shadow-md 
               hover:shadow-lg transform hover:-translate-y-0.5 transition font-medium 
               w-full sm:w-auto"
            >
              ✅ Update
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-600 text-white px-6 py-2 rounded shadow-md 
              hover:bg-gray-700 transition bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg shadow-md 
               hover:shadow-lg transform hover:-translate-y-0.5 transition font-medium 
               w-full sm:w-auto"
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
