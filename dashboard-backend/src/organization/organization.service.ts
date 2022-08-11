import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organization } from './organization.schema';
import { Employee } from '../employee/employee.schema';

@Injectable()
export class OrganizationService {
    constructor(
        @InjectModel(Organization.name) private organizationModel: Model<any>,
        @InjectModel(Employee.name) private employeeModel: Model<any>
    ) { }

    async createOrganization(org_body: { name: string }) {
        return await this.organizationModel.create(org_body)
    }

    async getEmployeesByDateRange(from, to, indexes, key) {
        return await this.employeeModel.find({ [key]: { $gte: from, $lte: to } }, { _id: 1, ...indexes })
    }

    async getOrganizationHistoryByKey(from, to, indexes, key) {
        return await this.employeeModel.find({ [key]: { $gte: from, $lte: to } }, { _id: 1, ...indexes })
    }

    async getRangeData(from_date, to_date, from_month, to_month) {
        return await this.employeeModel.aggregate([
            { $match: { $and: [{ month_added: { "$gt": from_month, $lt: to_month } }, { date_added: { "$gt": from_date, $lt: to_date } }] } },
            {
                $project: {
                    date_added: 1,
                    month_added: 1
                }
            },
            {
                $group: {
                    _id: { _id: "$month_added" },
                    date_added: { $first: "$date_added" },
                    month_added: { $first: "$month_added" },
                    totalEmployee: { $sum: 1 },
                    id: { $first: "$_id" }
                }
            }
        ])
    }
}