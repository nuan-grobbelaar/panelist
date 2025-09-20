import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateAppDto } from './dtos/create-app.dto';
import { App } from './schema/app.schema';

@Controller('api/apps')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create')
  async create(@Body() body: CreateAppDto): Promise<App> {
    return this.appService.createApp(body);
  }

  @Get()
  async findAll(@Query() query: Partial<CreateAppDto>): Promise<App[]> {
    return this.appService.findAll(query);
  }
}
