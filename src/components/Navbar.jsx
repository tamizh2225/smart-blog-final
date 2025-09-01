import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        {/* Logo / Title */}
        <div
          onClick={() => navigate("/")}
          className="text-2xl sm:text-3xl font-extrabold cursor-pointer text-white tracking-wide 
                     hover:text-blue-200 transform hover:scale-105 transition"
        >
          SmartBlog 🧠
        </div>

        {/* Hamburger for mobile */}
        <div className="sm:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white focus:outline-none"
          >
            {mobileOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Desktop / large screens buttons */}
        <div className="hidden sm:flex flex-row flex-wrap gap-3 items-center">
          {isViewer && onViewerHome && (
            <button
              onClick={() => navigate("/poster-login")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-xl shadow-md transition transform hover:-translate-y-0.5"
            >
              ➕ Post
            </button>
          )}
          {isPoster && onPosterHome && (
            <button
              onClick={() => navigate("/viewer-login")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-xl shadow-md transition transform hover:-translate-y-0.5"
            >
              🔍 View
            </button>
          )}
          {(isPoster || isViewer) && (
            <button
              onClick={() => navigate("/about-page")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded-xl shadow-md transition transform hover:-translate-y-0.5"
            >
              About
            </button>
          )}
          {(isPoster || isViewer) && (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-xl shadow-md transition transform hover:-translate-y-0.5"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="sm:hidden flex flex-col gap-2 px-4 pb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600">
          {isViewer && onViewerHome && (
            <button
              onClick={() => navigate("/poster-login")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl shadow-md transition"
            >
              ➕ Post
            </button>
          )}
          {isPoster && onPosterHome && (
            <button
              onClick={() => navigate("/viewer-login")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl shadow-md transition"
            >
              🔍 View
            </button>
          )}
          {(isPoster || isViewer) && (
            <button
              onClick={() => navigate("/about-page")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl shadow-md transition"
            >
              About
            </button>
          )}
          {(isPoster || isViewer) && (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl shadow-md transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
