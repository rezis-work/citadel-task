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

  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const extractUniqueValues = (data, key) => {
    return [...new Set(data.map((item) => item[key]))];
  };

  const uniqueLastnames = extractUniqueValues(users, "lastname");
  const uniqueFirstnames = extractUniqueValues(users, "firstname");

  const columns = [
    {
      title: "Firstname",
      dataIndex: "firstname",
      key: "firstname",
      width: "20%",
      filters: uniqueFirstnames.map((firstname) => ({
        text: firstname,
        value: firstname,
      })),
      filterSearch: true,
      onFilter: (value, record) => record.firstname.includes(value),
    },
    {
      title: "Lastname",
      dataIndex: "lastname",
      key: "lastname",
      width: "20%",
      filters: uniqueLastnames.map((lastname) => ({
        text: lastname,
        value: lastname,
      })),
      filterSearch: true,
      onFilter: (value, record) => record.lastname.includes(value),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: "10%",
      filters: [
        { text: "male", value: "male" },
        { text: "female", value: "female" },
      ],
      filterSearch: false,
      onFilter: (value, record) => record.gender === value,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: "10%",
    },
    {
      title: "Action",
      key: "action",
      width: "30%",
      fixed: "right",
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
    age: calculateAge(user.birthday),
  }));

  return (
    <>
      <div className=" opacity-0 xl:opacity-100 z-50">
        <Sidebar />
      </div>
      <div className="pt-10 pb-40 overflow-x-hidden">
        <div className="border-b-2 mb-6">
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
          <div className="xl:w-[1200] lg:w-[800px] mx-auto pl-2 lg:pl-0 z-0">
            <Button
              type="primary"
              onClick={openAddModal}
              style={{ marginBottom: 16 }}
            >
              Add User
            </Button>
            <Table
              dataSource={dataSource}
              columns={columns}
              scroll={{ x: 700, y: 300 }}
              pagination={{ pageSize: 5 }}
            />
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
