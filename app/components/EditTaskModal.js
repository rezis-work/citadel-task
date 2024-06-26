import { useEffect } from "react";
import { Modal, Form, Input, DatePicker, Select } from "antd";
import moment from "moment";

const { Option } = Select;

const EditTaskModal = ({ open, onCancel, onSave, task, users }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        title: task.title,
        description: task.description,
        status: task.status,
        fullname: task.assigned_member_id,
        completion_date: task.completion_date
          ? moment(task.completion_date)
          : null,
      });
    }
  }, [task, form]);

  const handleSave = () => {
    form.validateFields().then((values) => {
      const selectedUser = users.find((user) => user.id === values.fullname);

      if (!selectedUser) {
        console.error("Selected user not found in users array");
        return;
      }

      const taskData = {
        id: task.id,
        created_at: task.created_at,
        title: values.title.trim(),
        description: values.description.trim(),
        completion_date: values.completion_date
          ? values.completion_date.format("YYYY-MM-DD")
          : null,
        status: values.status,
        assigned_member_id: selectedUser.id,
      };

      onSave(task.key, taskData);

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
        <Form.Item
          name="completion_date"
          label="Completion Date, delete and add new date"
        >
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTaskModal;
