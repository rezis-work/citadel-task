import React from "react";
import { getTasks } from "../_lib/task-service";
import Spinner from "../components/Spinner";
import { getColumns, getDataSource } from "../_utils/tableSourse";
import { Table } from "antd";
import Heading from "../components/Heading";

export default async function TaskPage() {
  let tasks = [];
  let error = null;

  try {
    tasks = await getTasks();
  } catch (err) {
    error = err.message;
  }

  if (!tasks) return <Spinner />;

  const columnNames = {
    first: "Fullname",
    second: "Title",
    third: "Description",
    fourth: "Status",
    fifth: "Action",
  };

  const columns = getColumns(columnNames);
  const dataSource = getDataSource(tasks, columnNames, "action", "tasks");

  return (
    <div>
      <Heading category="Tasks" filter="filter" />
      {error ? (
        <p>Error fetching users: {error}</p>
      ) : tasks.length > 0 ? (
        <div className=" w-[1200px] mx-auto">
          <Table dataSource={dataSource} columns={columns} />
        </div>
      ) : (
        <p>Users not found</p>
      )}
    </div>
  );
}
