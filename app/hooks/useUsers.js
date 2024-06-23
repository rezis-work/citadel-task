// src/hooks/useUsers.js
import { useState, useEffect } from "react";
import {
  getUsers,
  deleteUser,
  patchUser,
  postUser,
} from "../_lib/user-service";
import { message } from "antd";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterParams, setFilterParams] = useState({});

  const fetchUsers = async () => {
    try {
      const userData = await getUsers(filterParams);
      setUsers(userData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filterParams]);

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      message.success("User deleted successfully!");
    } catch (error) {
      message.error(`Failed to delete user: ${error.message}`);
    }
  };

  const handleEdit = async (userId, userData) => {
    try {
      const updatedUser = await patchUser(userId, userData);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === userId ? updatedUser : user))
      );
      message.success("User updated successfully!");
    } catch (error) {
      message.error(`Failed to update user: ${error.message}`);
    }
  };

  const handleAdd = async (userData) => {
    try {
      const newUser = await postUser(userData);
      setUsers((prevUsers) => [...prevUsers, newUser]);
      message.success("User added successfully!");
    } catch (error) {
      message.error(`Failed to add user: ${error.message}`);
    }
  };

  const handleFilterSubmit = (queryParams) => {
    setFilterParams(queryParams);
  };

  return {
    users,
    loading,
    error,
    handleDelete,
    handleEdit,
    handleAdd,
    handleFilterSubmit,
  };
};
