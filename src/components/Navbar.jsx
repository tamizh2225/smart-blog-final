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

  const onPosterHome = location.pathname === "/poster-home";
  const onViewerHome = location.pathname === "/viewer-home";

  return (
    <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
        {/* Logo / Title */}
        <div
          onClick={() => navigate("/")}
          className="text-2xl sm:text-3xl font-extrabold cursor-pointer text-white tracking-wide 
                     hover:text-blue-200 transform hover:scale-105 transition mb-2 sm:mb-0"
        >
          SmartBlog 🧠
        </div>

        {/* Buttons */}
        <div className="flex flex-row flex-wrap gap-2 sm:gap-3 items-center">
          {/* Post button only on ViewerHome */}
          {isViewer && onViewerHome && (
            <button
              onClick={() => navigate("/poster-login")}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg shadow-md 
               hover:shadow-lg transform hover:-translate-y-0.5 transition font-medium 
               w-full sm:w-auto px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-md 
                         hover:shadow-lg transform hover:-translate-y-0.5 transition font-medium"
            >
              ➕Post
            </button>
          )}

          {/* View button only on PosterHome */}
          {isPoster && onPosterHome && (
            <button
              onClick={() => navigate("/viewer-login")}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg shadow-md 
               hover:shadow-lg transform hover:-translate-y-0.5 transition font-medium 
               w-full sm:w-auto px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-md 
                         hover:shadow-lg transform hover:-translate-y-0.5 transition font-medium"
            >
              🔍 View
            </button>
          )}

          {(isPoster || isViewer) && (
            <button
              onClick={() => navigate("/about-page")}
              className=" bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg shadow-md 
               hover:shadow-lg transform hover:-translate-y-0.5 transition font-medium 
               w-full sm:w-auto px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md 
                         hover:shadow-lg transform hover:-translate-y-0.5 transition font-medium"
            >
              About
            </button>
          )}

          {(isPoster || isViewer) && (
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md 
                         hover:shadow-lg transform hover:-translate-y-0.5 transition font-medium bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg shadow-md 
               hover:shadow-lg transform hover:-translate-y-0.5 transition font-medium 
               w-full sm:w-auto"
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
