import { Controller, Get, Query } from '@nestjs/common';
import { ComponentPopulateLevel, ComponentService } from './component.service';
import { Component } from './schemas/component.schema';
import { ComponentTemplate } from './schemas/component_template.schema';

@Controller('api/components')
export class ComponentApiController {
  constructor(private readonly componentService: ComponentService) {}

  @Get()
  getAllFrames(
    @Query('populateLevel') populateLevel?: ComponentPopulateLevel,
  ): Promise<Component[]> {
    return this.componentService.findAllComponents(populateLevel);
  }

  @Get('/templates')
  getAllFrameTemplates(): Promise<ComponentTemplate[]> {
    return this.componentService.findAllComponentTemplates();
  }
}
