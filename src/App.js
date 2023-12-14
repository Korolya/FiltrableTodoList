import React, { useState, useMemo, useCallback } from "react";
import "./styles.css";
import TaskItem from "./TaskItem";
import TaskInput from "./TaskInput";
import TaskFilter from "./TaskFilter";
import TaskStatistics from "./TaskStatistics";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [showOnlyIncomplete, setShowOnlyIncomplete] = useState(false);
  const [activeSort, setActiveSort] = useState("newest");

  const handleInputChange = useCallback((event) => {
    setNewTask(event.target.value);
  }, []);

  const handleAddTask = useCallback(() => {
    if (newTask.trim() !== "") {
      const currentDate = new Date();
      const newTaskObj = {
        id: Date.now(),
        name: newTask,
        completed: false,
        createdAt: currentDate.getTime()
      };
      setTasks((prevTasks) => [...prevTasks, newTaskObj]);
      setNewTask("");
    }
  }, [newTask]);

  const handleCheckboxChange = useCallback((taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            completed: !task.completed
          };
        }
        return task;
      })
    );
  }, []);

  const handleDeleteTask = useCallback((taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }, []);

  const handleFilterChange = useCallback(() => {
    setShowOnlyIncomplete((prevValue) => !prevValue);
  }, []);

  const handleSortChange = useCallback((sortType) => {
    setActiveSort(sortType);
  }, []);

  const filteredTasks = useMemo(() => {
    let filtered = tasks;
    if (showOnlyIncomplete) {
      filtered = filtered.filter((task) => !task.completed);
    }

    switch (activeSort) {
      case "newest":
        return [...filtered].sort((a, b) => b.createdAt - a.createdAt);
      case "oldest":
        return [...filtered].sort((a, b) => a.createdAt - b.createdAt);
      case "alphabetical":
        return [...filtered].sort((a, b) =>
          a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
        );
      default:
        return filtered;
    }
  }, [tasks, showOnlyIncomplete, activeSort]);

  const totalTasks = tasks.length;
  const completedTasks = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks]
  );
  const remainingTasks = useMemo(() => totalTasks - completedTasks, [
    totalTasks,
    completedTasks
  ]);

  return (
    <div>
      <h1>TODO LIST</h1>
      <TaskStatistics
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        remainingTasks={remainingTasks}
      />
      <TaskInput
        newTask={newTask}
        handleInputChange={handleInputChange}
        handleAddTask={handleAddTask}
      />
      <TaskFilter
        showOnlyIncomplete={showOnlyIncomplete}
        handleFilterChange={handleFilterChange}
        handleSortChange={handleSortChange}
        activeSort={activeSort}
      />
      <label>
        FILTER:
        <input
          type="checkbox"
          checked={showOnlyIncomplete}
          onChange={handleFilterChange}
        />
        Show only incomplete
      </label>
      <ul>
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onCheckboxChange={handleCheckboxChange}
            onDeleteTask={handleDeleteTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
