import React from "react";

const TaskFilter = ({ handleSortChange, activeSort }) => {
  return (
    <div>
      Sort by:
      <button
        className={activeSort === "newest" ? "active" : ""}
        onClick={() => handleSortChange("newest")}
      >
        Newest
      </button>
      <button
        className={activeSort === "oldest" ? "active" : ""}
        onClick={() => handleSortChange("oldest")}
      >
        Oldest
      </button>
      <button
        className={activeSort === "alphabetical" ? "active" : ""}
        onClick={() => handleSortChange("alphabetical")}
      >
        Alphabetical
      </button>
    </div>
  );
};

export default TaskFilter;
