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
import { ComponentPopulateLevel, ComponentService } from './component.service';
import { Component } from './schemas/component.schema';
import { ComponentTemplate } from './schemas/component_template.schema';
import { CreateComponentDto } from './dtos/create-component.dto';
import { CreateComponentTemplateDto } from './dtos/create-component-template.dto';
import { UpdateComponentTemplateDto } from './dtos/update-component-template.dto';
import { UpdateComponentDto } from './dtos/update-component.dto';
import { DeleteResult } from 'mongoose';

@Controller('api/components')
export class ComponentApiController {
  constructor(private readonly componentService: ComponentService) {}

  @Post()
  async createComponent(@Body() body: CreateComponentDto): Promise<Component> {
    return this.componentService.createComponent(body);
  }

  @Put(':id')
  async updateComponent(
    @Param('id') id: string,
    @Body() body: UpdateComponentDto,
  ): Promise<Component> {
    return this.componentService.updateComponent(id, body);
  }

  @Get()
  getAllComponents(
    @Query('populateLevel') populateLevel?: ComponentPopulateLevel,
  ): Promise<Component[]> {
    return this.componentService.findAllComponents(populateLevel);
  }

  @Get('findById/:id')
  getComponentById(@Param('id') id: string): Promise<Component> {
    return this.componentService.findComponentById(id);
  }

  @Delete(':id')
  deleteComponent(@Param('id') id: string): Promise<DeleteResult> {
    return this.componentService.deleteComponent(id);
  }

  @Post('templates')
  async createComponentTemplate(
    @Body() body: CreateComponentTemplateDto,
  ): Promise<ComponentTemplate> {
    return this.componentService.createComponentTemplate(body);
  }

  @Put('templates/:id')
  async updateComponentTemplate(
    @Param('id') id: string,
    @Body() body: UpdateComponentTemplateDto,
  ): Promise<ComponentTemplate> {
    return this.componentService.updateComponentTemplate(id, body);
  }

  @Get('templates')
  getAllComponentTemplates(): Promise<ComponentTemplate[]> {
    return this.componentService.findAllComponentTemplates();
  }

  @Get('templates/findById/:id')
  getComponentTemplateById(
    @Param('id') id: string,
  ): Promise<ComponentTemplate> {
    return this.componentService.findComponentTemplateById(id);
  }

  @Delete('templates/:templateId')
  deleteComponentTemplate(
    @Param('templateId') templateId: string,
  ): Promise<DeleteResult> {
    return this.componentService.deleteComponentTemplate(templateId);
  }
}
