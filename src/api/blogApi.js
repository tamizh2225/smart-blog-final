// blogApi.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/blogs";

// Get all blogs
export const getBlogs = () => {
  return axios.get(BASE_URL);
};

// Get a blog by ID
export const getBlogById = (id) => {
  return axios.get(`${BASE_URL}/${id}`);
};

// Create a new blog
export const createBlog = (blogData) => {
  return axios.post(BASE_URL, blogData);
};

// Update an existing blog
export const updateBlog = (id, blogData) => {
  return axios.put(`${BASE_URL}/${id}`, blogData);
};

// Delete a blog
export const deleteBlog = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};
