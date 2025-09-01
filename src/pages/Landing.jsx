import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-black min-h-screen w-full overflow-hidden">
      {/* Fullscreen 3D iframe */}
      <iframe
        src="https://my.spline.design/robotfollowcursorforlandingpage-FmikpBVSD5V67FUysW0KGg2L/"
        className="absolute top-0 left-0 w-full h-full border-0"
        title="3D Robot following cursor"
      ></iframe>

      {/* Black overlay for readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 pointer-events-none"></div>

      {/* Content at top-left */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 flex flex-col space-y-4 sm:space-y-6 text-white z-10">
        {/* Logo / App Name */}
        <h1 className="text-3xl sm:text-4xl font-bold">Smart Blog</h1>

        {/* Hero Text */}
        <p className="max-w-xs sm:max-w-md text-base sm:text-lg">
          Write smart. Read smarter. Discover AI-powered blogs.
        </p>

        {/* Login Buttons */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
          <button
            onClick={() => navigate("/viewer-login")}
            className="px-5 py-2 rounded border-2 border-purple-700 bg-transparent hover:bg-purple-700 hover:border-purple-950 transition"
          >
            🔑 Viewer Login
          </button>
          <button
            onClick={() => navigate("/poster-login")}
            className="px-5 py-2 rounded border-2 border-pink-800 bg-transparent hover:bg-pink-800 hover:border-pink-800 transition"
          >
            ✍️ Poster Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
