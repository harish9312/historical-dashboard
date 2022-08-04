import { Body, Controller, Get, Inject, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'type';
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
  async createEmployee(@Req() req: Request, @Res() res: Response, @Body() payload: IEmployeeBody): Promise<{}> {
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

  @Get('/:emp_id')
  async getEmployeeById(@Req() req: Request, @Res() res: Response) {
    const emp = await this.empService.getEmployee(req.params.emp_id)
    return res.send({
      emp
    })
  }

}
