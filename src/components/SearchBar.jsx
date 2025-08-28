import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm, sortBy, setSortBy }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-white rounded shadow-sm border">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full md:w-2/3 border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      {/* Sort Dropdown */}
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="w-full md:w-auto border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        <option value="newest">📅 Newest</option>
        <option value="oldest">🕰️ Oldest</option>
        <option value="az">🔤 A–Z</option>
        <option value="za">🔡 Z–A</option>
      </select>
    </div>
  );
};

export default SearchBar;
