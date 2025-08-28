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
    <div className="p-6 bg-gray-100 min-h-screen">
      <Navbar />

      {/* ✅ Toast Message */}
      {showToast && (
        <div className="fixed top-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow-md z-50">
          ✅ Blog successfully created!
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Hello, {posterName} 👋</h2>
        <button
          onClick={() => navigate("/create-blog")}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          ➕ Create New Blog
        </button>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="grid gap-6 mt-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} isPosterView={true} />
          ))
        ) : (
          <p>No blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default PosterHome;
