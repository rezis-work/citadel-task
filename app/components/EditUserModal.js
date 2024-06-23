"use client";
import React, { useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";

const EditUserModal = ({ visible, user, onCancel, onSave }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user, form]);

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        onSave(user.key, values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      visible={visible} // Corrected prop name to 'visible'
      title="Edit User"
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
        <Form.Item name="gender" label="Gender">
          <Input />
        </Form.Item>
        <Form.Item name="birthday" label="Birthday">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
