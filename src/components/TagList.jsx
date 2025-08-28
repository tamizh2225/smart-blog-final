// src/components/TagList.jsx
// src/components/TagList.jsx
import React from "react";

const TagList = ({ tags }) => {
  if (!Array.isArray(tags) || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full shadow hover:bg-blue-200 transition"
        >
          #{tag.trim()}
        </span>
      ))}
    </div>
  );
};

export default TagList;
