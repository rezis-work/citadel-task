import { useState } from "react";
import { Dropdown, Menu, Checkbox, Button, Input, Select } from "antd";
import { DownOutlined } from "@ant-design/icons";

const { Option } = Select;

const FilterDropDownTask = ({ users, onFilterChange, onClearFilters }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [filters, setFilters] = useState({
    title: "",
    description: "",
    status: undefined,
    assignedMember: undefined,
    expired: false,
  });

  const handleTitleFilter = (value) => {
    setFilters({ ...filters, title: value });
  };

  const handleDescriptionFilter = (value) => {
    setFilters({ ...filters, description: value });
  };

  const handleStatusFilter = (value) => {
    setFilters({ ...filters, status: value });
  };

  const handleAssignedMemberFilter = (value) => {
    setFilters({ ...filters, assignedMember: value });
  };

  const handleExpiredFilter = (checked) => {
    setFilters({ ...filters, expired: checked });
  };

  const applyFilters = () => {
    onFilterChange(filters);
    setMenuVisible(false);
  };

  const clearFilters = () => {
    setFilters({
      title: "",
      description: "",
      status: undefined,
      assignedMember: undefined,
      expired: false,
    });
    onClearFilters();
    setMenuVisible(false);
  };

  const handleMenuVisibleChange = (visible) => {
    setMenuVisible(visible);
    if (!visible) {
      setFilters({
        title: "",
        description: "",
        status: undefined,
        assignedMember: undefined,
        expired: false,
      });
    }
  };

  const menu = (
    <Menu selectable={false}>
      <Menu.Item key="title">
        <Input
          placeholder="Filter by Title"
          value={filters.title}
          onChange={(e) => handleTitleFilter(e.target.value)}
          style={{ width: 200 }}
        />
      </Menu.Item>
      <Menu.Item key="description">
        <Input
          placeholder="Filter by Description"
          value={filters.description}
          onChange={(e) => handleDescriptionFilter(e.target.value)}
          style={{ width: 200 }}
        />
      </Menu.Item>
      <Menu.Item key="status">
        <Select
          style={{ width: 200 }}
          placeholder="Filter by Status"
          value={filters.status}
          onChange={handleStatusFilter}
        >
          <Option value="pending">Pending</Option>
          <Option value="ongoing">Ongoing</Option>
          <Option value="completed">Completed</Option>
        </Select>
      </Menu.Item>
      <Menu.SubMenu key="assignedMember" title="Filter by Assigned Member">
        {users?.map((user) => (
          <Menu.Item
            key={user.id}
            onClick={() => handleAssignedMemberFilter(user.id)}
          >
            {`${user.firstname} ${user.lastname}`}
          </Menu.Item>
        ))}
      </Menu.SubMenu>
      <Menu.Item key="expired">
        <Checkbox
          checked={filters.expired}
          onChange={(e) => handleExpiredFilter(e.target.checked)}
        >
          Expired Work
        </Checkbox>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="apply">
        <Button type="primary" onClick={applyFilters}>
          Apply Filters
        </Button>
      </Menu.Item>
      <Menu.Item key="clear">
        <Button onClick={clearFilters}>Clear Filters</Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
      placement="bottomCenter"
      trigger={["click"]}
      visible={menuVisible}
      onVisibleChange={handleMenuVisibleChange}
    >
      <Button icon={<DownOutlined />} style={{ marginRight: 8 }}>
        Filters
      </Button>
    </Dropdown>
  );
};

export default FilterDropDownTask;
