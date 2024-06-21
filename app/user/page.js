import React from "react";
import { getUsers } from "../_lib/user-service";
import Spinner from "../components/Spinner";
import { Table } from "antd";
import Heading from "../components/Heading";
import { getColumns, getDataSource } from "../_utils/tableSourse";
import FilterDropdown from "../components/FilterDropdown";

export default async function UserPage() {
  let users = [];
  let error = null;

  try {
    users = await getUsers();
  } catch (err) {
    error = err.message;
  }

  if (!users) return <Spinner />;

  const columnNames = {
    first: "Firstname",
    second: "Lastname",
    third: "Gender",
    fourth: "Birthday",
    fifth: "Action",
  };

  const columns = getColumns(columnNames);
  const dataSource = getDataSource(users, columnNames, "action", "users");

  return (
    <div>
      <Heading category="Users" />
      {error ? (
        <p>Error fetching users: {error}</p>
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
