import { Body, Controller, Get, Inject, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'type';
import { OrganizationService } from './organization.service';

@Controller('organization')
export class OrganizationController {

    constructor(

        @Inject(OrganizationService)
        private orgService: OrganizationService
    ) { }

    @Post('/')
    async createOrganization(@Req() req: Request, @Res() res: Response, @Body() org_body: { name: string }) {
        const response = await this.orgService.createOrganization(org_body)
        return res.send({
            response
        })
    }

    @Get('/organization-empployees/:from/:to')
    async getOrganizationEmployeesByDateRange(@Req() req: Request, @Res() res: Response) {
        console.log('>> req.query', req.query);
        const employees = await this.orgService.getEmployeesByDateRange(req.params.from, req.params.to, req.query, req.query.key)
        return res.send({
            employees
        })
    }

    @Get('/organization-employee/:from_date/:to_date/:from_month/:to_month')
    async getOrganizationDataByRange(@Req() req: Request, @Res() res: Response) {
        const { from_date, to_date, from_month, to_month } = req.params;
        const orgData = await this.orgService.getRangeData(from_date, to_date, from_month, to_month)
        return res.send({
            orgData
        })
    }

}
