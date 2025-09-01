import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm, sortBy, setSortBy }) => {
  return (
    <div
      className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 
                    bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg"
    >
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full md:w-2/3 px-4 py-2 rounded-xl border border-white/30 
                   bg-white/20 text-black placeholder-white/70 
                   focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 
                   transition shadow-sm"
      />

      {/* Sort Dropdown */}
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="w-full md:w-auto px-4 py-2 rounded-xl border border-white/30 
                   bg-white/20 text-black focus:outline-none focus:ring-2 focus:ring-indigo-400 
                   focus:border-indigo-400 transition shadow-sm"
      >
        <option value="newest" className="text-black">
          📅 Newest
        </option>
        <option value="oldest" className="text-black">
          🕰️ Oldest
        </option>
        <option value="az" className="text-black">
          🔤 A–Z
        </option>
        <option value="za" className="text-black">
          🔡 Z–A
        </option>
      </select>
    </div>
  );
};

export default SearchBar;
