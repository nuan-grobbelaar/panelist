import { Controller, Get, Query } from '@nestjs/common';
import { Panel } from './schemas/panel.schema';
import { PanelPopulateLevel, PanelService } from './panel.service';

@Controller('api/panels')
export class PanelApiController {
  constructor(private readonly panelService: PanelService) {}

  @Get()
  getAll(
    @Query('populateLevel') populateLevel?: PanelPopulateLevel,
  ): Promise<Panel[]> {
    return this.panelService.findAll(populateLevel);
  }
}
