import { Select } from "antd";
import React from "react";

const { Option } = Select;

const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};

export const ASelect: React.FC = () => (
  <>
    <Select
      mode="multiple"
      allowClear
      style={{ width: "100%" }}
      placeholder="Please select"
      onChange={handleChange}
    >
      {["React", "Angular", "Java", "DevOps"].map((x) => (
        <Option key={x}>{x}</Option>
      ))}
    </Select>
  </>
);
