import React from "react";
import { getUsers } from "../_lib/user-service";
import Spinner from "../components/Spinner";
import { Table } from "antd";
import Heading from "../components/Heading";

export default async function UserPage() {
  let users = [];
  let error = null;

  try {
    users = await getUsers();
  } catch (error) {
    error = err.message;
  }

  if (!users) return <Spinner />;

  console.log(users);

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
      dataIndex: "action",
      key: "action",
    },
  ];

  const dataSource = users.map((user) => ({
    key: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    gender: user.gender,
    birthday: user.birthday,
    action: "Action", // Placeholder for action column
  }));

  return (
    <div>
      <Heading category="Users" />
      {error ? (
        <p>Error fetching users: {}</p>
      ) : users.length > 0 ? (
        <div className=" w-[1200px] mx-auto">
          <Table dataSource={dataSource} columns={columns} />
        </div>
      ) : (
        <p>Users not found</p>
      )}
    </div>
  );
}
