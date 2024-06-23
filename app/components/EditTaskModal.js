import React, { useState, useEffect } from "react";
import { Modal, Form, Input, DatePicker, Select } from "antd";
import moment from "moment";

const { Option } = Select;

const EditTaskModal = ({ open, onCancel, onSave, task }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        title: task.title,
        description: task.description,
        status: task.status,
        fullname: `${task._assigned_member?.firstname || ""} ${
          task._assigned_member?.lastname || ""
        }`,
        completion_date: task.completion_date
          ? moment(task.completion_date)
          : null,
      });
    }
  }, [task, form]);

  const handleSave = () => {
    form.validateFields().then((values) => {
      onSave(task.key, values);
      form.resetFields();
    });
  };

  return (
    <Modal
      open={open}
      title="Edit Task"
      onCancel={onCancel}
      onOk={handleSave}
      okText="Save"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input the task title!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Please input the task description!" },
          ]}
        >
          <Input />
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
        <Form.Item name="fullname" label="Assigned Member">
          <Input disabled />
        </Form.Item>
        <Form.Item name="completion_date" label="Completion Date">
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTaskModal;
