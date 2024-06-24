"use client";
import { useState } from "react";
import { Table, Button, Popconfirm } from "antd";

import { useUsers } from "../hooks/useUsers";
import Spinner from "../components/Spinner";
import Heading from "../components/Heading";
import EditUserModal from "../components/EditUserModal";
import AddUserModal from "../components/AddUserModal";
import Sidebar from "../components/Sidebar";

export default function UserPage() {
  const {
    users,
    loading,
    error,
    handleDelete,
    handleEdit,
    handleAdd,
    handleFilterSubmit,
  } = useUsers();

  const [editingUser, setEditingUser] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);

  const openEditModal = (user) => {
    setEditingUser(user);
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditingUser(null);
    setEditModalVisible(false);
  };

  const openAddModal = () => {
    setAddModalVisible(true);
  };

  const closeAddModal = () => {
    setAddModalVisible(false);
  };

  const saveEdit = async (userId, userData) => {
    await handleEdit(userId, userData);
    closeEditModal();
  };

  const saveNewUser = async (userData) => {
    await handleAdd(userData);
    closeAddModal();
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
          <Button type="link" onClick={() => openEditModal(record)}>
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
              onClick={openAddModal}
              style={{ marginBottom: 16 }}
            >
              Add User
            </Button>
            <Table dataSource={dataSource} columns={columns} />
          </div>
        ) : (
          <p className="text-center">Users not found</p>
        )}
        <EditUserModal
          visible={editModalVisible}
          user={editingUser}
          onCancel={closeEditModal}
          onSave={saveEdit}
        />
        <AddUserModal
          visible={addModalVisible}
          onCancel={closeAddModal}
          onSave={saveNewUser}
        />
      </div>
    </>
  );
}
