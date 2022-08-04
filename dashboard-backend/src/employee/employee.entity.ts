import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'


@Entity()

export class Employee {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    emp_id: number

    @Column()
    emp_name: string

    @Column()
    email: string

    @Column()
    phone_number: number

}