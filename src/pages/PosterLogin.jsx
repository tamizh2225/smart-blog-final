import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PosterLogin = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem("posterName", name.trim());
      navigate("/poster-home"); // Update route when PosterHome page created
    } else {
      alert("Please enter your name or email");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h2 className="text-2xl font-semibold mb-6">Poster Login</h2>

      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-sm">
        <input
          type="text"
          placeholder="Enter your name or email"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-600"
        />

        <button
          type="submit"
          className="bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
        >
          Login as Poster
        </button>
      </form>
    </div>
  );
};

export default PosterLogin;
