import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { generateBlogFromIdea } from "../api/aiUtils";
import { createBlog } from "../api/blogApi";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [loadingAI, setLoadingAI] = useState("");
  const [blogIdea, setBlogIdea] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const posterName = localStorage.getItem("posterName");
    const viewerName = localStorage.getItem("viewerName");
    setAuthor(posterName || viewerName || "Anonymous");
  }, []);

  const withLoading = async (label, asyncFn) => {
    setLoadingAI(label);
    try {
      await asyncFn();
    } catch (err) {
      console.error("AI Error:", err);
      alert(`AI ${label} failed. Check console for details.`);
    } finally {
      setLoadingAI("");
    }
  };

  const handleAutoFillFromIdea = () => {
    if (!blogIdea) return alert("Enter a blog idea to generate form content.");
    withLoading("Auto-Filling Form", async () => {
      const aiBlog = await generateBlogFromIdea(blogIdea);
      setTitle(aiBlog.title);
      setSubject(aiBlog.subject);
      setContent(aiBlog.content);
      setTags(aiBlog.tags);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !subject || !content) {
      alert("Title, Subject, and Content are required.");
      return;
    }

    const newBlog = {
      title,
      subject,
      content,
      tag: tags,
      image: imageUrl,
      author,
      createdAt: new Date().toISOString(),
    };

    try {
      await createBlog(newBlog);
      navigate("/poster-home", {
        state: { successMessage: "Blog successfully created!" },
      });
    } catch {
      alert("Failed to create blog.");
    }
  };

  const handleGoBack = () => {
    const role = localStorage.getItem("activeRole");
    navigate(role === "poster" ? "/poster-home" : "/viewer-home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-blue-600 text-white p-6">
      <div
        className="max-w-3xl mx-auto p-6 mt-8 
                   bg-gradient-to-br from-indigo-500 via-purple-600 to-blue-600 text-white p-6"
      >
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
          📝 Create New Blog
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Blog Idea Input */}
          <div>
            <label className="block font-semibold mb-1">💡 Blog Idea</label>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="e.g. Future of AI in education"
                value={blogIdea}
                onChange={(e) => setBlogIdea(e.target.value)}
                className="flex-grow px-3 py-2 rounded-xl bg-white/10 border border-white/20 
                         placeholder-gray-300 text-black focus:outline-none 
                         focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="button"
                onClick={handleAutoFillFromIdea}
                disabled={loadingAI}
                className="bg-gradient-to-r from-indigo-400 via-purple-500 to-blue-500 
                         text-white px-4 py-2 rounded-xl shadow-md 
                         hover:scale-105 transition disabled:opacity-50"
              >
                {loadingAI === "Auto-Filling Form"
                  ? "⏳ Filling..."
                  : "🧠 AI Auto-Fill"}
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 
                       placeholder-gray-300 text-black focus:outline-none 
                       focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block font-semibold mb-1">
              Subject (Max 200 chars)
            </label>
            <textarea
              rows={3}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              maxLength={200}
              className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 
                       placeholder-gray-300 text-black focus:outline-none 
                       focus:ring-2 focus:ring-indigo-400"
              required
            />
            <p className="text-sm text-white/60 text-right">
              {subject.length}/200
            </p>
          </div>

          {/* Content */}
          <div>
            <label className="block font-semibold mb-1">Content</label>
            <textarea
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 
                       placeholder-gray-300 text-black focus:outline-none 
                       focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block font-semibold mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 
                       placeholder-gray-300 text-black focus:outline-none 
                       focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block font-semibold mb-1">
              Image URL (optional)
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 
                       placeholder-gray-300 text-black focus:outline-none 
                       focus:ring-2 focus:ring-indigo-400"
            />
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-48 object-cover rounded-xl mt-2 border border-white/20"
                onError={(e) => {
                  e.target.src = "/placeholder.png";
                }}
              />
            )}
          </div>

          {/* Author and Date */}
          <div className="flex justify-between text-white/70 text-sm italic">
            <span>Author: {author}</span>
            <span>Date: {new Date().toLocaleString()}</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loadingAI}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 
                     text-white py-3 rounded-xl shadow-md font-semibold 
                     hover:scale-[1.02] transition disabled:opacity-50"
          >
            {loadingAI ? "Please wait..." : "🚀 Submit Blog"}
          </button>

          {/* Go Back */}
          <button
            onClick={handleGoBack}
            type="button"
            className="fixed bottom-6 right-6 bg-white/10 backdrop-blur-lg 
                     text-white px-5 py-3 rounded-full border border-white/20 
                     shadow-lg hover:scale-110 hover:bg-white/20 transition"
          >
            ← Go Back
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
