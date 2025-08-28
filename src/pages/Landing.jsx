import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      {/* Logo / App Name */}
      <h1 className="text-4xl font-bold mb-12 text-center">Smart Blog</h1>

      {/* Hero Banner */}
      <p className="text-lg mb-12 text-center max-w-xl">
        Write smart. Read smarter. Discover AI-powered blogs.
      </p>

      {/* Login Buttons */}
      <div className="flex space-x-6">
        <button
          onClick={() => navigate("/viewer-login")}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          🔑 Viewer Login
        </button>
        <button
          onClick={() => navigate("/poster-login")}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
        >
          ✍️ Poster Login
        </button>
      </div>
    </div>
  );
};

export default Landing;
