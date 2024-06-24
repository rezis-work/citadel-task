import { Modal, Form, Input, Button, Select, message } from "antd";
import moment from "moment";

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

  const validateName = (_, value) => {
    const georgianAndEnglishRegex = /^[\u10D0-\u10F6\u10F7a-zA-Z\s]*$/;
    if (!georgianAndEnglishRegex.test(value.trim())) {
      return Promise.reject("Please input only Georgian and English letters!");
    }
    return Promise.resolve();
  };

  const validateGender = (_, value) => {
    if (!value) {
      return Promise.reject("Please select your gender!");
    }
    return Promise.resolve();
  };

  const validateBirthday = (_, value) => {
    const dateFormat = "YYYY-MM-DD";
    if (!moment(value, dateFormat, true).isValid()) {
      return Promise.reject("Please input the birthday in format YYYY-MM-DD!");
    }

    const birthDate = moment(value);
    const today = moment();
    const yearsDiff = today.diff(birthDate, "years");

    const minDate = today.clone().subtract(18, "years");

    if (birthDate.isAfter(minDate)) {
      return Promise.reject("You must be at least 18 years old!");
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
          label="First name"
          rules={[
            { required: true, message: "Please input the firstname!" },
            { validator: validateName },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastname"
          label="Last name"
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
        <Form.Item name="salary" label="Salary">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
