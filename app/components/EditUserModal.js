import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import moment from "moment";

const { Option } = Select;

const EditUserModal = ({ visible, user, onCancel, onSave }) => {
  const [form] = Form.useForm();
  const [birthday, setBirthday] = useState(null);

  useEffect(() => {
    if (user) {
      const formattedBirthday = user.birthday
        ? moment(user.birthday).format("YYYY-MM-DD")
        : null;
      form.setFieldsValue({
        ...user,
        birthday: formattedBirthday,
      });
      setBirthday(formattedBirthday);
    }
  }, [user, form]);

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        onSave(user.key, { ...values, birthday });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleBirthdayChange = (e) => {
    const value = e.target.value.trim();
    setBirthday(value);
  };

  const validateBirthday = (_, value) => {
    const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateFormat.test(value)) {
      return Promise.reject("Please input the birthday in format YYYY-MM-DD!");
    }
    return Promise.resolve();
  };

  const validateGeorgianAndEnglishLetters = (_, value) => {
    const georgianAndEnglishRegex = /^[\u10D0-\u10F6\u10F7a-zA-Z\s]*$/;
    if (!georgianAndEnglishRegex.test(value.trim())) {
      return Promise.reject("Please input only Georgian and English letters!");
    }
    return Promise.resolve();
  };

  return (
    <Modal
      visible={visible}
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
          rules={[
            { required: true, message: "Please input the firstname!" },
            {
              validator: (_, value) =>
                validateGeorgianAndEnglishLetters(_, value),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastname"
          label="Lastname"
          rules={[
            { required: true, message: "Please input the lastname!" },
            {
              validator: (_, value) =>
                validateGeorgianAndEnglishLetters(_, value),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: "Please select the gender!" }]}
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
            { required: true, message: "Please input the birthday!" },
            { validator: validateBirthday },
          ]}
        >
          <Input
            placeholder="YYYY-MM-DD"
            value={birthday || ""}
            onChange={handleBirthdayChange}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
