"use client";
import React, { useState } from "react";
import { Table, Button, Popconfirm, message } from "antd";
import Heading from "../components/Heading";
import Spinner from "../components/Spinner";
import { useTasks } from "../hooks/useTasks";
import EditTaskModal from "../components/EditTaskModal";

const TaskPage = () => {
  const { tasks, loading, error, handleDelete, handleEdit, handleAdd } =
    useTasks();
  const [editingTask, setEditingTask] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const openEditModal = (task) => {
    setEditingTask(task);
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditingTask(null);
    setEditModalVisible(false);
  };

  const saveEdit = async (taskId, taskData) => {
    try {
      console.log("Editing Task:", { taskId, taskData });
      await handleEdit(taskId, taskData);
      message.success("Task updated successfully!");
    } catch (error) {
      console.error("Error updating task:", error);
      message.error(`Failed to update task: ${error.message}`);
    } finally {
      closeEditModal();
    }
  };

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
      title: "Completion Date",
      dataIndex: "completion_date",
      key: "completion_date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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
            title="Are you sure to delete this task?"
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

  const dataSource = tasks.map((task) => ({
    key: task.id,
    fullname: `${task._assigned_member?.firstname || ""} ${
      task._assigned_member?.lastname || ""
    }`,
    title: task.title,
    description: task.description,
    completion_date: task.completion_date,
    status: task.status,
  }));

  return (
    <div>
      <Heading category="Tasks" filter="filter" />
      {loading ? (
        <Spinner />
      ) : error ? (
        <p>Error fetching tasks: {error}</p>
      ) : tasks.length > 0 ? (
        <div className="w-[1200px] mx-auto">
          <Button
            type="primary"
            onClick={() =>
              handleAdd({
                title: "New Task",
                description: "Description",
                status: "pending",
              })
            }
            style={{ marginBottom: 16 }}
          >
            Add Task
          </Button>
          <Table dataSource={dataSource} columns={columns} />
        </div>
      ) : (
        <p>Tasks not found</p>
      )}
      <EditTaskModal
        open={editModalVisible}
        onCancel={closeEditModal}
        onSave={saveEdit}
        task={editingTask}
      />
    </div>
  );
};

export default TaskPage;
