import { useState, useEffect } from "react";
import {
  getTasks,
  deleteTask,
  patchTask,
  postTask,
} from "../_lib/task-service";
import { message } from "antd";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      const taskData = await getTasks();
      setTasks(taskData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      message.success("Task deleted successfully!");
    } catch (error) {
      message.error(`Failed to delete task: ${error.message}`);
    }
  };

  const handleEdit = async (taskId, taskData) => {
    try {
      console.log("Patching Task:", { taskId, taskData });
      const updatedTask = await patchTask(taskId, taskData);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  };

  const handleAdd = async (taskData) => {
    try {
      const newTask = await postTask(taskData);
      setTasks((prevTasks) => [...prevTasks, newTask]);
      message.success("Task added successfully!");
    } catch (error) {
      message.error(`Failed to add task: ${error.message}`);
    }
  };

  return { tasks, loading, error, handleDelete, handleEdit, handleAdd };
};
