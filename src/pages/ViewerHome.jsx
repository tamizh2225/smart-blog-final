import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import { getBlogs } from "../api/blogApi";
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
    <div className="p-6 bg-gray-100 min-h-screen">
      <Navbar />

      <h2 className="text-2xl font-semibold mb-4">Welcome, {viewerName} 👀</h2>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <div className="grid gap-6 mt-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <BlogCardViewer key={blog.id} blog={blog} />
          ))
        ) : (
          <p>No blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewerHome;
