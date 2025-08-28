import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewerLogin = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem("viewerName", name.trim());
      navigate("/viewer-home"); // Update route when ViewerHome page created
    } else {
      alert("Please enter your name or email");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h2 className="text-2xl font-semibold mb-6">Viewer Login</h2>

      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-sm">
        <input
          type="text"
          placeholder="Enter your name or email"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Continue as Viewer
        </button>
      </form>
    </div>
  );
};

export default ViewerLogin;
