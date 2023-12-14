import React from "react";

const TaskInput = ({ newTask, handleInputChange, handleAddTask }) => {
  return (
    <div>
      <input
        className="change"
        type="text"
        value={newTask}
        onChange={handleInputChange}
      />
      <button className="add" onClick={handleAddTask}>
        Add
      </button>
    </div>
  );
};

export default TaskInput;
