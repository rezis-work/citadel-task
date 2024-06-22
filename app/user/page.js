"use client";
import React, { useState, useEffect } from "react";
import { getUsers, deleteUser } from "../_lib/user-service";
import Spinner from "../components/Spinner";
import { Table, Button, Popconfirm, message } from "antd";
import Heading from "../components/Heading";

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getUsers();
        setUsers(userData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

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
      <Heading category="Users" />
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
    </div>
  );
}
