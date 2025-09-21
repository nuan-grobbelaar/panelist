import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateAppDto } from './dtos/create-app.dto';
import { App } from './schema/app.schema';
import { UpdateAppDto } from './dtos/update-app.dto';
import { DeleteResult } from 'mongoose';

@Controller('api/apps')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async create(@Body() body: CreateAppDto): Promise<App> {
    return this.appService.createApp(body);
  }

  @Put(':id')
  async updateApp(
    @Param('id') id: string,
    @Body() body: UpdateAppDto,
  ): Promise<App> {
    return this.appService.updateApp(id, body);
  }

  @Get()
  async findAll(@Query() query: Partial<CreateAppDto>): Promise<App[]> {
    return this.appService.findAll(query);
  }

  @Delete(':id')
  deleteApp(@Param('id') id: string): Promise<DeleteResult> {
    return this.appService.deleteApp(id);
  }
}
