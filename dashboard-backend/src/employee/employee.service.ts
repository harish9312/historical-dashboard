import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from './employee.schema';
import * as moment from 'moment';
import { uniqueNamesGenerator, colors } from 'unique-names-generator';
const randomEmail = require('random-email')

@Injectable()
export class EmployeeService {
    constructor(
        @InjectModel(Employee.name)
        private employeeModel: Model<Employee>
    ) { }

    async createEmployee(employeeData) {
        let date = [];
        let month = [];
        let year = [];
        let i = 1;
        while (i <= 10) {
            const mom = moment(
                new Date(+new Date() - Math.floor(Math.random() * 10000000000))
            );
            date.push(mom.format('DD'));
            month.push(mom.format('MM'));
            year.push(mom.format('YYYY'));
            i++
        }

        let j = 0;
        const allPromise = []
        while (j < 1000) {
            const data = await this.employeeModel.create({
                "emp_id": j,
                "emp_name": uniqueNamesGenerator({ dictionaries: [colors] }),
                "email": randomEmail(),
                "emp_org": "62eb66f92a95c0277bedcba3",
                "phone_number": i * 213132,
                "date_added": date[this.getRandomInt(10)],
                "month_added": month[this.getRandomInt(10)],
                "year_added": year[this.getRandomInt(10)],
                "ctc": this.getRandomInt(50)
            })
            allPromise.push(data)
            j++
        }

        return await Promise.allSettled(allPromise)
    }

    getEmployee(emp_id) {
        return this.employeeModel.findOne({ emp_id }, { email: 1 })
    }
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
}
