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
import { Panel } from './schemas/panel.schema';
import { PanelPopulateLevel, PanelService } from './panel.service';
import { CreatePanelDto } from './dtos/create-panel.dto';
import { DeleteResult } from 'mongoose';
import { UpdatePanelDto } from './dtos/update-panel.dto';
import {Component} from "../components/schemas/component.schema";

@Controller('api/panels')
export class PanelApiController {
  constructor(private readonly panelService: PanelService) {}

  @Post()
  async create(@Body() body: CreatePanelDto): Promise<Panel> {
    return this.panelService.create(body);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdatePanelDto,
  ): Promise<Panel> {
    return this.panelService.updatePanel(id, body);
  }

  @Get()
  getAll(
    @Query('populateLevel') populateLevel?: PanelPopulateLevel,
  ): Promise<Panel[]> {
    return this.panelService.findAll(populateLevel);
  }

  @Get('findById/:id')
  getComponentById(@Param('id') id: string): Promise<Panel> {
    return this.panelService.findPanelById(id);
  }

  @Delete(':id')
  deletePanel(@Param('id') id: string): Promise<DeleteResult> {
    return this.panelService.deletePanel(id);
  }
}
