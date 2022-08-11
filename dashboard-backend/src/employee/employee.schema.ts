import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose';
import { Organization } from '../organization/organization.schema';

@Schema({
    timestamps: true
})
export class Employee {
    @Prop({ index: true, unique: true, required: true })
    emp_id: number

    @Prop()
    emp_name: string

    @Prop()
    email: string

    @Prop()
    phone_number: number

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Organization', index: true })
    emp_org: Organization

    @Prop()
    date_added: string

    @Prop()
    month_added: string

    @Prop()
    year_added: string

    @Prop()
    ctc: string

    @Prop()
    team: string

}

export const EmployeeSchema = SchemaFactory.createForClass(Employee)
