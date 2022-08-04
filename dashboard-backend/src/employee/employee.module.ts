import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeController } from './employee.controller';
import { Employee, EmployeeSchema } from './employee.schema';
import { EmployeeService } from './employee.service';
import * as moment from 'moment';


@Module({
  imports: [MongooseModule.forFeatureAsync([{
    name: Employee.name, useFactory: () => {
      const schema = EmployeeSchema
      schema.pre('save', function (next) {
        let emp = this;
        // emp.date_added = moment().format('DD')
        // emp.month_added = moment().format('MM')
        // emp.year_added = moment().format('YYYY')
        next()
      })
      return schema
    }
  }])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService]
})
export class EmployeeModule { }
