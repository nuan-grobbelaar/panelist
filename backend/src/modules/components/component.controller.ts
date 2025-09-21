import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ComponentPopulateLevel, ComponentService } from './component.service';
import { Component } from './schemas/component.schema';
import { ComponentTemplate } from './schemas/component_template.schema';
import { CreateComponentDto } from './dtos/create-component.dto';
import { CreateComponentTemplateDto } from './dtos/create-component-template.dto';

@Controller('api/components')
export class ComponentApiController {
  constructor(private readonly componentService: ComponentService) {}

  @Post('create')
  async createComponent(@Body() body: CreateComponentDto): Promise<Component> {
    return this.componentService.createComponent(body);
  }

  @Get()
  getAllComponents(
    @Query('populateLevel') populateLevel?: ComponentPopulateLevel,
  ): Promise<Component[]> {
    return this.componentService.findAllComponents(populateLevel);
  }

  @Post('templates/create')
  async createComponentTemplate(
    @Body() body: CreateComponentTemplateDto,
  ): Promise<ComponentTemplate> {
    return this.componentService.createComponentTemplate(body);
  }

  @Get('templates')
  getAllComponentTemplates(): Promise<ComponentTemplate[]> {
    return this.componentService.findAllComponentTemplates();
  }
}
