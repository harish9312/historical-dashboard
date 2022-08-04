import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { OrganizationController } from './organization/organization.controller';
import { OrganizationModule } from './organization/organization.module';
import { OrganizationService } from './organization/organization.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    EmployeeModule,
    OrganizationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

