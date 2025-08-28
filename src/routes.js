import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your pages (for now, simple placeholders)
import Landing from "./pages/Landing";
import ViewerLogin from "./pages/ViewerLogin";
import PosterLogin from "./pages/PosterLogin";
import PosterHome from "./pages/PosterHome";
import ViewerHome from "./pages/ViewerHome";
import CreateBlog from "./pages/CreateBlog";
import BlogDetailViewer from "./pages/BlogDetailViewer";
import EditBlog from "./pages/EditBlog";
import AboutPage from "./pages/AboutPage";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/viewer-login" element={<ViewerLogin />} />
        <Route path="/poster-login" element={<PosterLogin />} />
        <Route path="/poster-home" element={<PosterHome />} />
        <Route path="/viewer-home" element={<ViewerHome />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/blog/:id" element={<BlogDetailViewer />} />
        <Route path="/edit-blog/:id" element={<EditBlog />} />
        <Route path="/about-page" element={<AboutPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
