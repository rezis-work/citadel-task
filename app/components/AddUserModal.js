// components/AddUserModal.js

import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";

const AddUserModal = ({ visible, onCancel, onSave }) => {
  const [form] = Form.useForm();

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        onSave(values);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      visible={visible}
      title="Add User"
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
          name="firstname"
          label="Firstname"
          rules={[{ required: true, message: "Please input the firstname!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastname"
          label="Lastname"
          rules={[{ required: true, message: "Please input the lastname!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: "Please input your gender" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="birthday"
          label="Birthday"
          rules={[{ required: true, message: "Please input your birthday" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="salary" label="Salary">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
