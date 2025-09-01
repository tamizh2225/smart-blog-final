import React, { useEffect, useState } from "react";
import { getBlogs } from "../api/blogApi";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";
import BlogCardViewer from "../components/BlogCardViewer";

const ViewerHome = () => {
  const viewerName = localStorage.getItem("viewerName") || "Guest";

  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  localStorage.setItem("activeRole", "viewer");

  useEffect(() => {
    getBlogs()
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch blogs:", err);
        const allBlogs = JSON.parse(localStorage.getItem("posterBlogs")) || [];
        setBlogs(allBlogs);
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
      {/* Navbar */}
      <Navbar />

      {/* Welcome */}
      <h2 className="text-center text-3xl sm:text-4xl font-bold mb-6 mt-4">
        Welcome, {viewerName} 👀
      </h2>

      {/* Search */}
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
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 shadow-lg border border-white/20 hover:scale-[1.02] transform transition"
            >
              <BlogCardViewer blog={blog} />
            </div>
          ))
        ) : (
          <p className="text-center text-blue-100">No blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewerHome;
