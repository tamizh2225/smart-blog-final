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
    <div
      className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden
                 bg-gradient-to-br from-indigo-500 via-purple-600 to-blue-600 text-white"
    >
      {/* Dark overlay for contrast */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

      {/* Form container */}
      <div className="relative z-10 w-full max-w-sm bg-black/20 backdrop-blur-md p-6 rounded-2xl shadow-2xl flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-6 text-white text-center">
          Viewer Login
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <input
            type="text"
            placeholder="Enter your name or email"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-white/40 rounded-lg p-3 mb-4 bg-white/20 text-black placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-800 backdrop-blur-sm"
          />

          <button
            type="submit"
            className="px-5 py-3 rounded border-2 border-purple-800 bg-transparent hover:bg-purple-800 hover:border-purple-950 transition"
          >
            Continue as Viewer
          </button>
        </form>
      </div>
    </div>
  );
};

export default ViewerLogin;
