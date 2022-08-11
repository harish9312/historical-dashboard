import { DatePicker, Space } from "antd";
import { Moment } from "moment";
import { RangeValue } from "rc-picker/lib/interface";
import React from "react";

const { RangePicker } = DatePicker;

interface IADatePickerProps {
  value: any;
  handleDateChange: (
    values: RangeValue<Moment>,
    formatString: [string, string]
  ) => void;
}

export const ADatePicker = (props: IADatePickerProps) => {
  return (
    <RangePicker
      value={props.value}
      placeholder={["Start Date", "End Date"]}
      onChange={props.handleDateChange}
    />
  );
};
