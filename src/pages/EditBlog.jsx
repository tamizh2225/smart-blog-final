import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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

  // ✅ a) Fetch Blog by ID
  useEffect(() => {
    axios
      .get(`/blogs/${id}`)
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
      .catch((err) => {
        alert("Failed to load blog. Please try again.");
        navigate("/poster");
      });
  }, [id, navigate]);

  // ✅ c) Handle Update
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
      author, // ⬅️ Preserve author
      createdAt, // ⬅️ (Optional, or use original createdAt)
    };

    try {
      setLoading(true);
      await axios.put(`/blogs/${id}`, updatedBlog);
      navigate("/poster-home", {
        state: { successMessage: "Blog updated successfully!" },
      });
    } catch {
      alert("Failed to update blog.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ d) Cancel Button
  const handleCancel = () => {
    navigate("/poster-home");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md mt-8">
      <h2 className="text-2xl font-semibold mb-6">✏️ Edit Blog</h2>

      <form onSubmit={handleUpdate} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Subject */}
        <div>
          <label className="block font-medium mb-1">Subject</label>
          <textarea
            rows={3}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label className="block font-medium mb-1">Content</label>
          <textarea
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block font-medium mb-1">
            Tags (comma separated)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block font-medium mb-1">Image URL (optional)</label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            ✅ Update
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition"
          >
            ❌ Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
