import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Organization, OrganizationSchema } from './organization.schema';
import { OrganizationService } from './organization.service';
import { EmployeeService } from '../employee/employee.service';
import { EmployeeModule } from '../employee/employee.module';
import { Employee, EmployeeSchema } from '../employee/employee.schema';

@Module({
    imports: [
        EmployeeModule,
        MongooseModule.forFeature([{ name: Organization.name, schema: OrganizationSchema }, { name: Employee.name, schema: EmployeeSchema }]),
    ],
    controllers: [OrganizationController],
    providers: [OrganizationService, EmployeeService],
    exports: [OrganizationService, EmployeeService]
})
export class OrganizationModule { }
