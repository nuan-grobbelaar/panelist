import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Panel } from './schemas/panel.schema';
import { PanelPopulateLevel, PanelService } from './panel.service';
import { CreatePanelDto } from './dtos/create-panel.dto';

@Controller('api/panels')
export class PanelApiController {
  constructor(private readonly panelService: PanelService) {}

  @Post('create')
  async create(@Body() body: CreatePanelDto): Promise<Panel> {
    return this.panelService.create(body);
  }

  @Get()
  getAll(
    @Query('populateLevel') populateLevel?: PanelPopulateLevel,
  ): Promise<Panel[]> {
    return this.panelService.findAll(populateLevel);
  }
}
