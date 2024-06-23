import React, { useEffect } from "react";
import { Modal, Form, Input, DatePicker, Select, Button } from "antd";

const { Option } = Select;

const AddTaskModal = ({ open, onCancel, onSave, users }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      form.resetFields();
    }
  }, [open, form]);

  const handleSave = () => {
    form.validateFields().then((values) => {
      const selectedUser = users.find((user) => user.id === values.fullname);

      if (!selectedUser) {
        console.error("Selected user not found in users array");
        return;
      }

      const taskData = {
        title: values.title.trim(),
        description: values.description.trim(),
        status: values.status,
        assigned_member_id: selectedUser.id,
        completion_date: values.completion_date
          ? values.completion_date.format("YYYY-MM-DD")
          : null,
      };

      onSave(taskData);

      form.resetFields();
    });
  };

  const validateTrimmedInput = (_, value) => {
    if (!value || value.trim() === "") {
      return Promise.reject("This field cannot be empty!");
    }
    return Promise.resolve();
  };

  return (
    <Modal
      visible={open}
      title="Add Task"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[
            { required: true, message: "Please input the task title!" },
            { validator: validateTrimmedInput },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Please input the task description!" },
            { validator: validateTrimmedInput },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[
            { required: true, message: "Please select the task status!" },
          ]}
        >
          <Select>
            <Option value="pending">Pending</Option>
            <Option value="ongoing">Ongoing</Option>
            <Option value="completed">Completed</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="fullname"
          label="Assigned Member"
          rules={[
            { required: true, message: "Please select an assigned member!" },
          ]}
        >
          <Select placeholder="Select an assigned member">
            {users.map((user) => (
              <Option key={user.id} value={user.id}>
                {`${user.firstname} ${user.lastname}`}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="completion_date" label="Completion Date">
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTaskModal;
