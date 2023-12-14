import React from "react";

const TaskStatistics = ({ totalTasks, completedTasks, remainingTasks }) => {
  return (
    <div>
      <span>Total: {totalTasks} </span>
      <span>Completed: {completedTasks} </span>
      <span>Remaining: {remainingTasks} </span>
    </div>
  );
};

export default TaskStatistics;
