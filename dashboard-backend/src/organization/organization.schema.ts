import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class Organization {
    @Prop()
    name: string
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization)