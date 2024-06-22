"use client";
import React, { useState, useEffect } from "react";
import { getUsers, deleteUser, patchUser } from "../_lib/user-service";
import Spinner from "../components/Spinner";
import { Table, Button, Popconfirm, message } from "antd";
import Heading from "../components/Heading";
import EditUserModal from "../components/EditUserModal";

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const fetchUsers = async (filtereParams) => {
    try {
      const userData = await getUsers(filtereParams);
      setUsers(userData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      // Remove the deleted user from the local state
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      message.success("User deleted successfully!");
    } catch (error) {
      message.error(`Failed to delete user: ${error.message}`);
    }
  };

  const handleEdit = (user) => {
    console.log("Editing user:", user);
    setEditingUser(user);
    setEditModalVisible(true);
  };

  const handleSaveEdit = async (userId, userData) => {
    try {
      const updatedUser = await patchUser(userId, userData);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === userId ? updatedUser : user))
      );
      setEditModalVisible(false);
      message.success("User updated successfully!");
    } catch (error) {
      message.error(`Failed to update user: ${error.message}`);
    }
  };

  const columns = [
    {
      title: "Firstname",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "Lastname",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const dataSource = users.map((user) => ({
    key: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    gender: user.gender,
    birthday: user.birthday,
  }));

  return (
    <div>
      <Heading category="Users" onFilterSubmit={fetchUsers} type="user" />
      {loading ? (
        <Spinner />
      ) : error ? (
        <p>Error fetching users: {error}</p>
      ) : users.length > 0 ? (
        <div className="w-[1200px] mx-auto">
          <Table dataSource={dataSource} columns={columns} />
        </div>
      ) : (
        <p>Users not found</p>
      )}
      <EditUserModal
        visible={editModalVisible}
        user={editingUser}
        onCancel={() => setEditModalVisible(false)}
        onSave={handleSaveEdit}
      />
    </div>
  );
}
