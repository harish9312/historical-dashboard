import { BaseModel } from "./BaseModel";
interface IEmployeeModelProps {
  _id: string;
  email: string;
  emp_name: string;
}

export class EmployeeModel extends BaseModel<IEmployeeModelProps> {
  constructor(props: any) {
    super(props);
    console.log('Employee Props', props);
    this.props = props;
  }
  static resource = "employee";
}
