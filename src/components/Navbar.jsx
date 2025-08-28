import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isPoster = localStorage.getItem("posterName");
  const isViewer = localStorage.getItem("viewerName");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Determine current page for button logic
  const onPosterHome = location.pathname === "/poster-home";
  const onViewerHome = location.pathname === "/viewer-home";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 ">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <div
          onClick={() => navigate("/")}
          className="text-3xl font-bold cursor-pointer text-blue-600 select-none hover:text-blue-800 transform hover:-translate-y-1 hover:scale-105 transition duration-300"
        >
          SmartBlog 🧠
        </div>

        <div className="flex items-center space-x-6">
          {/* Post button only on ViewerHome page */}
          {isViewer && onViewerHome && (
            <button
              onClick={() => navigate("/poster-login")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transform hover:-translate-y-1 hover:scale-105 transition duration-300"
            >
              ✍️ Post
            </button>
          )}

          {/* View button only on PosterHome page */}
          {isPoster && onPosterHome && (
            <button
              onClick={() => navigate("/viewer-login")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transform hover:-translate-y-1 hover:scale-105 transition duration-300"
            >
              🔍 View
            </button>
          )}

          {(isPoster || isViewer) && (
            <button
              onClick={() => navigate("/about-page")}
              className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transform hover:-translate-y-1 hover:scale-105 transition duration-300"
            >
              About
            </button>
          )}

          {/* Logout button for both */}
          {(isPoster || isViewer) && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transform hover:-translate-y-1 hover:scale-105 transition duration-300"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
