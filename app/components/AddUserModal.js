import React from "react";
import { Modal, Form, Input, Button, Select } from "antd";

const { Option } = Select;

const AddUserModal = ({ visible, onCancel, onSave }) => {
  const [form] = Form.useForm();

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        onSave(values);
        form.resetFields();
      })
      .catch((error) => {
        console.log("Validate Failed:", error);
      });
  };

  // Custom validator for firstname and lastname
  const validateName = (_, value) => {
    const georgianAndEnglishRegex = /^[\u10D0-\u10F6\u10F7a-zA-Z\s]*$/; // Georgian letters, English letters, and spaces
    if (!georgianAndEnglishRegex.test(value.trim())) {
      return Promise.reject("Please input only Georgian and English letters!");
    }
    return Promise.resolve();
  };

  // Custom validator for gender
  const validateGender = (_, value) => {
    if (!value) {
      return Promise.reject("Please select your gender!");
    }
    return Promise.resolve();
  };

  // Custom validator for birthday
  const validateBirthday = (_, value) => {
    const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateFormat.test(value)) {
      return Promise.reject("Please input the birthday in format YYYY-MM-DD!");
    }
    return Promise.resolve();
  };

  // Custom validator for salary (optional field)
  const validateSalary = (_, value) => {
    if (value && isNaN(value)) {
      return Promise.reject("Salary should be a number!");
    }
    return Promise.resolve();
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
          rules={[
            { required: true, message: "Please input the firstname!" },
            { validator: validateName },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastname"
          label="Lastname"
          rules={[
            { required: true, message: "Please input the lastname!" },
            { validator: validateName },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[
            { required: true, message: "Please select your gender!" },
            { validator: validateGender },
          ]}
        >
          <Select placeholder="Select gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="birthday"
          label="Birthday"
          rules={[
            { required: true, message: "Please input your birthday!" },
            { validator: validateBirthday },
          ]}
        >
          <Input placeholder="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item
          name="salary"
          label="Salary"
          rules={[{ validator: validateSalary }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
