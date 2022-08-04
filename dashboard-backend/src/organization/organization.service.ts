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

    async getEmployeeByDateRange(from, to, indexes) {
        return await this.employeeModel.find({ month_added: { $gte: from, $lte: to } }, { _id: 0, ...indexes })
    }
}
