"use client";
import { useState, useEffect } from "react";
import { Table, Button, Popconfirm, message } from "antd";

import { getUsers } from "../_lib/user-service";
import { useTasks } from "../hooks/useTasks";
import Heading from "../components/Heading";
import Spinner from "../components/Spinner";
import AddTaskModal from "../components/AddTaskModal";
import EditTaskModal from "../components/EditTaskModal";
import FilterDropDownTask from "../components/FilterDropDownTask";
import Sidebar from "../components/Sidebar";

const TaskPage = () => {
  const {
    tasks: allTasks,
    loading,
    error,
    handleDelete,
    handleEdit,
    handleAdd,
  } = useTasks();
  const [editingTask, setEditingTask] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    title: "",
    description: "",
    status: undefined,
    assignedMember: undefined,
    expired: false,
  });

  const fetchUsers = async () => {
    try {
      const usersData = await getUsers({});
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setTasks(allTasks);
  }, [allTasks]);

  const handleFilterChange = (filters) => {
    let filtered = [...allTasks];

    if (filters.title) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(filters.title.toLowerCase())
      );
    }

    if (filters.status) {
      filtered = filtered.filter((task) => task.status === filters.status);
    }

    if (filters.assignedMember) {
      filtered = filtered.filter(
        (task) =>
          task._assigned_member &&
          task._assigned_member.id === filters.assignedMember
      );
    }

    if (filters.expired) {
      filtered = filtered.filter(
        (task) =>
          task.completion_date && new Date(task.completion_date) < new Date()
      );
    }

    setTasks(filtered);
    setFilters(filters);
  };

  const clearFilters = () => {
    setFilters({
      title: "",
      description: "",
      status: undefined,
      assignedMember: undefined,
      expired: false,
    });
    setTasks(allTasks);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditingTask(null);
    setEditModalVisible(false);
  };

  const openAddModal = () => {
    setAddModalVisible(true);
  };

  const closeAddModal = () => {
    setAddModalVisible(false);
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

  const saveNewTask = async (taskData) => {
    try {
      await handleAdd(taskData);
      message.success("Task added successfully!");
    } catch (error) {
      console.error("Error adding task:", error);
      message.error(`Failed to add task: ${error.message}`);
    } finally {
      closeAddModal();
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
      task._assigned_member?.lastname || "Pending"
    }`,
    title: task.title,
    description: task.description,
    completion_date: task.completion_date,
    status: task.status,
  }));

  const rowClassName = (record) => {
    const isExpired =
      record.completion_date && new Date(record.completion_date) < new Date();
    if (isExpired && record.status === "ongoing") {
      return "expired-ongoing-task-row";
    }
    if (isExpired && record.status === "completed") {
      return "expired-completed-task-row";
    }
    if (record.status === "completed") {
      return "completed-task-row";
    }
    return "";
  };

  return (
    <>
      <Sidebar />
      <div className="pt-4 pb-40 ">
        <div className=" flex w-[1200px] mx-auto pt-10 border-b-2 mb-10">
          <Heading category="Tasks" filter="filter" />
          <FilterDropDownTask
            users={users}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
          />
          <Button onClick={clearFilters} style={{ marginLeft: 10 }}>
            Clear Filters
          </Button>
        </div>
        {loading ? (
          <Spinner />
        ) : error ? (
          <p>Error fetching tasks: {error}</p>
        ) : tasks.length > 0 ? (
          <div className="w-[1200px] mx-auto">
            <Button
              type="primary"
              onClick={() =>
                openAddModal({
                  title: "New Task",
                  description: "Description",
                  status: "pending",
                })
              }
              style={{ marginBottom: 16 }}
            >
              Add Task
            </Button>
            <Table
              dataSource={dataSource}
              columns={columns}
              rowClassName={rowClassName}
            />
          </div>
        ) : (
          <p className=" text-center">No tasks found</p>
        )}
        <EditTaskModal
          open={editModalVisible}
          onCancel={closeEditModal}
          onSave={saveEdit}
          task={editingTask}
          users={users}
        />
        <AddTaskModal
          open={addModalVisible}
          onCancel={closeAddModal}
          onSave={saveNewTask}
          users={users}
        />
      </div>
    </>
  );
};

export default TaskPage;
