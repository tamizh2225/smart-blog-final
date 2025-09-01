import React, { useEffect, useState } from "react";

const CommentBox = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  // Load comments on mount
  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem("comments")) || {};
    const blogComments = storedComments[blogId] || [];
    setComments(blogComments);
  }, [blogId]);

  // Save to localStorage whenever comments change
  const saveCommentsToLocalStorage = (updatedComments) => {
    const storedComments = JSON.parse(localStorage.getItem("comments")) || {};
    storedComments[blogId] = updatedComments;
    localStorage.setItem("comments", JSON.stringify(storedComments));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    const newComment = {
      id: Date.now(),
      name,
      text,
      createdAt: new Date().toLocaleString(),
    };

    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    saveCommentsToLocalStorage(updatedComments);
    setName("");
    setText("");
  };

  const handleDelete = (id) => {
    const updatedComments = comments.filter((c) => c.id !== id);
    setComments(updatedComments);
    saveCommentsToLocalStorage(updatedComments);
  };

  return (
    <div className="mt-6">
      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your comment..."
          className="w-full px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          type="submit"
          className="w-full sm:w-auto bg-gradient-to-r from-indigo-400 via-purple-500 to-blue-500 
                     text-white px-6 py-2 rounded-xl shadow-md 
                     hover:scale-105 transform transition font-semibold"
        >
          ➕ Add Comment
        </button>
      </form>

      {/* Comments List */}
      <ul className="mt-6 space-y-4">
        {comments.length > 0 ? (
          comments.map((c) => (
            <li
              key={c.id}
              className="bg-white/10 backdrop-blur-lg p-4 rounded-xl shadow-md border border-white/20 flex justify-between items-start"
            >
              <div>
                <p className="font-semibold text-indigo-200">{c.name}</p>
                <p className="text-indigo-50">{c.text}</p>
                <p className="text-sm text-white/60">{c.createdAt}</p>
              </div>
              <button
                onClick={() => handleDelete(c.id)}
                className="text-red-400 font-bold hover:text-red-500 transition"
              >
                Delete ❌
              </button>
            </li>
          ))
        ) : (
          <p className="text-indigo-100">No comments yet.</p>
        )}
      </ul>
    </div>
  );
};

export default CommentBox;
