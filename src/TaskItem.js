import React, { useState } from "react";

const TaskItem = ({ task, onCheckboxChange, onDeleteTask }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const createdAt = new Date(task.createdAt).toLocaleString();

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onCheckboxChange(task.id)}
      />
      <span>{task.name}</span>
      <span>{createdAt}</span>
      {isHovered && (
        <button className="delete" onClick={() => onDeleteTask(task.id)}>
          Delete
        </button>
      )}
    </li>
  );
};

export default TaskItem;
