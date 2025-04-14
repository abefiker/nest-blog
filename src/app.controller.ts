import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UseGuards } from '@nestjs/common';
import { RoleGuard } from './guard/role.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @UseGuards(RoleGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
