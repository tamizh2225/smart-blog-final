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
    saveCommentsToLocalStorage(updatedComments); // 🔁 Save here
    setName("");
    setText("");
  };

  const handleDelete = (id) => {
    const updatedComments = comments.filter((c) => c.id !== id);
    setComments(updatedComments);
    saveCommentsToLocalStorage(updatedComments); // 🔁 Save here too
  };

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your comment..."
          className="w-full border px-4 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Add Comment
        </button>
      </form>

      <ul className="mt-6 space-y-4">
        {comments.length > 0 ? (
          comments.map((c) => (
            <li
              key={c.id}
              className="bg-gray-100 p-4 rounded shadow-sm flex justify-between"
            >
              <div>
                <p className="font-semibold">{c.name}</p>
                <p className="text-gray-700">{c.text}</p>
                <p className="text-sm text-gray-500">{c.createdAt}</p>
              </div>
              <button
                onClick={() => handleDelete(c.id)}
                className="text-red-500 font-bold"
              >
                DELETE
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-400">No comments yet.</p>
        )}
      </ul>
    </div>
  );
};

export default CommentBox;
