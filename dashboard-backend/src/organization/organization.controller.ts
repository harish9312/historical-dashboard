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
        const employees = await this.orgService.getEmployeeByDateRange(req.params.from, req.params.to, req.query)
        return res.send({
            employees
        })
    }

}
