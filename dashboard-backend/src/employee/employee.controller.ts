import { Body, Controller, Get, Inject, Post, Req, Res, Request, Response } from '@nestjs/common';
import { response } from 'express';
import { IEmployeeBody } from './employee.dto';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {

  constructor(
    @Inject(EmployeeService)
    private empService: EmployeeService
  ) { }

  @Get()
  index(): string {
    return 'this is employee';
  }


  @Post('/create-employee')
  async createEmployee(@Req() req: Request, @Res() res: any, @Body() payload: IEmployeeBody): Promise<{}> {
    console.log('>> payload', payload);
    try {
      const respnose = await this.empService.createEmployee(payload)
      return res.send({
        respnose
      })
    } catch (error) {
      throw error
    }
  }

}
