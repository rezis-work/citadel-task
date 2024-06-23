"use client";
import React, { useState, useEffect } from "react";
import {
  getUsers,
  deleteUser,
  patchUser,
  postUser,
} from "../_lib/user-service";
import Spinner from "../components/Spinner";
import { Table, Button, Popconfirm, message } from "antd";
import Heading from "../components/Heading";
import EditUserModal from "../components/EditUserModal";
import AddUserModal from "../components/AddUserModal";
import Sidebar from "../components/Sidebar";

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
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
      // Remove the deleted user from the local state
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      message.success("User deleted successfully!");
    } catch (error) {
      message.error(`Failed to delete user: ${error.message}`);
    }
  };

  const handleEdit = (user) => {
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

  const handleAdd = () => {
    setAddModalVisible(true);
  };

  const handleSaveAdd = async (userData) => {
    try {
      const newUser = await postUser(userData);
      setUsers((prevUsers) => [...prevUsers, newUser]);
      setAddModalVisible(false);
      message.success("User added successfully!");
    } catch (error) {
      message.error(`Failed to add user: ${error.message}`);
    }
  };

  const handleFilterSubmit = (queryParams) => {
    setFilterParams(queryParams); // Update filterParams state with submitted query parameters
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
    <>
      <Sidebar />
      <div className="pt-10 pb-40">
        <div className=" border-b-2 mb-6">
          <Heading
            category="Users Page"
            onFilterSubmit={handleFilterSubmit}
            type="user"
          />
        </div>
        {loading ? (
          <Spinner />
        ) : error ? (
          <p>Error fetching users: {error}</p>
        ) : users.length > 0 ? (
          <div className="w-[1200px] mx-auto">
            <Button
              type="primary"
              onClick={handleAdd}
              style={{ marginBottom: 16 }}
            >
              Add User
            </Button>
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
        <AddUserModal
          visible={addModalVisible}
          onCancel={() => setAddModalVisible(false)}
          onSave={handleSaveAdd}
        />
      </div>
    </>
  );
}
