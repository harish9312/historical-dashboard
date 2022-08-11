import axios from "axios";
import * as React from "react";
import { connect } from "react-redux";
import { EmployeeModel } from "../models/EmployeeModel";
import { OrganizationModel } from "../models/OrganizationModel";
import { ASelect } from "./ASelect";
import { Async } from "./Async";
import AChart from "./Charts/AreaChart";
import { ADatePicker } from "./DatePicker";
import "./home.scss";
export interface IHomeProps {
  organization: OrganizationModel[];
}

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface IHomeState {
  selectedRange: string;
}

class HomeImpl extends React.Component<IHomeProps, IHomeState> {
  state: IHomeState = {
    selectedRange: "",
  };

  promise = async () => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users`);
    new EmployeeModel(res.data).$saveAll();
  };

  constructData = () => {
    // console.log(">> this.props", this.props);
    return this.props.organization?.map((x) => {
      return {
        name: months[x.props.month_added.toString().substr(1, 1)],
        totalEmployees: x.props.totalEmployee,
      };
    });
  };

  onDateChange = async (value, formatString) => {
    OrganizationModel.deleteAll(this.props.organization);
    console.log("formatString", formatString);
    const from_d_a = formatString[0].split("-")[2];
    const to_d_a = formatString[1].split("-")[2];
    const from_m_a = formatString[0].split("-")[1];
    const to_m_a = formatString[1].split("-")[1];
    const res = await axios.get(
      `http://localdev.fyndx0.de:3001/organization/organization-employee/${from_d_a}/${to_d_a}/${from_m_a}/${to_m_a}`
    );
    new OrganizationModel(res.data.orgData).$saveAll();
    this.setState({
      selectedRange: value,
    });
  };

  homePage = () => {
    const data = this.constructData();
    return (
      <div className="home-main">
        <div className="">
          <h1>Historic DB</h1>
        </div>
        <div className="all-filters">
          <ADatePicker
            handleDateChange={this.onDateChange}
            value={this.state.selectedRange}
          />
          <ASelect />
        </div>
        <div>
          <AChart data={data} />
        </div>
      </div>
    );
  };

  render() {
    return (
      <Async
        identifier="User"
        promise={this.promise}
        content={this.homePage()}
        loader={<h1>Loading...</h1>}
        error={<h2>Error</h2>}
      />
    );
  }
}

const mapStateToProps = () => ({ organization: OrganizationModel.list() });

export const Home = connect(mapStateToProps)(HomeImpl);
