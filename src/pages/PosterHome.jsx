import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // <-- Added useLocation
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import SearchBar from "../components/SearchBar";
import { getBlogs } from "../api/blogApi";

const PosterHome = () => {
  const navigate = useNavigate();
  const location = useLocation(); // <-- Added
  const posterName = localStorage.getItem("posterName") || "Unknown Poster";

  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showToast, setShowToast] = useState(false); // <-- Toast state

  localStorage.setItem("activeRole", "poster"); // <-- 🔥 ADD THIS LINE

  const exampleBlog = {
    id: 1,
    title: "Welcome to SmartBlog",
    content:
      "This is an example blog post for poster.Learn how to set up and use Drive for desktop to sync, access, and manage your files across devices and the cloud. Find out how to customize your settings, work offline, collaborate on Office",
    image: "https://source.unsplash.com/featured/?blog",
    tags: ["intro", "poster"],
    createdAt: new Date().toISOString(),
    author: posterName,
  };

  useEffect(() => {
    // ✅ Show toast once if navigated with state
    if (location.state?.successMessage) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      // 🧹 Clear state so it doesn't show again
      window.history.replaceState({}, document.title);
    }

    getBlogs()
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setBlogs(res.data);
        } else {
          setBlogs([exampleBlog]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch blogs:", err);
        const stored = JSON.parse(localStorage.getItem("posterBlogs")) || [];
        if (stored.length > 0) {
          setBlogs(stored);
        } else {
          setBlogs([exampleBlog]);
        }
      });
  }, []);

  const filteredBlogs = blogs
    .filter((blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "az") return a.title.localeCompare(b.title);
      if (sortBy === "za") return b.title.localeCompare(a.title);
      return 0;
    });

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-blue-600 text-white">
      <Navbar />

      {/* ✅ Toast Message */}
      {showToast && (
        <div className="fixed top-6 right-6 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          ✅ Blog successfully created!
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 mt-4 gap-4 sm:gap-0">
        <h2 className="text-3xl sm:text-4xl font-bold text-center sm:text-left">
          Hello, {posterName} 👋
        </h2>
        <button
          onClick={() => navigate("/create-blog")}
          className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-xl p-4 
                    bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg shadow-md 
               hover:shadow-lg transform hover:-translate-y-0.5 transition font-medium 
               w-full sm:w-auto"
        >
          ➕ Create New Blog
        </button>
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-10">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>

      {/* Blog Cards */}
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 shadow-lg border border-white/20 
                         hover:scale-[1.02] transform transition"
            >
              <BlogCard blog={blog} isPosterView={true} />
            </div>
          ))
        ) : (
          <p className="text-center text-blue-100">No blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default PosterHome;
