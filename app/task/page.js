import React from "react";
import { getTasks } from "../_lib/task-service";
import Spinner from "../components/Spinner";
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

  const columns = [
    {
      title: "Fullname",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  const dataSource = tasks.map((task) => ({
    key: task.id,
    fullname: `${task._assigned_member?.firstname || ""} ${
      task._assigned_member?.lastname || ""
    }`,
    title: task.title,
    description: task.description,
    status: task.status,
    action: "action", // Replace with actual action logic
  }));

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
