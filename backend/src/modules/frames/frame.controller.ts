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
import { FramePopulateLevel, FrameService } from './frame.service';
import { Frame } from './schemas/frame.schema';
import { CreateFrameDto } from './dtos/create-frame.dto';
import { DeleteResult } from 'mongoose';
import { UpdateFrameDto } from './dtos/update-frame.dto';

@Controller('api/frames')
export class FrameApiController {
  constructor(private readonly frameService: FrameService) {}

  @Post()
  async create(@Body() body: CreateFrameDto): Promise<Frame> {
    return this.frameService.create(body);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateFrameDto,
  ): Promise<Frame> {
    return this.frameService.updatePanel(id, body);
  }

  @Get()
  getAllFrames(
    @Query('populateLevel') populateLevel?: FramePopulateLevel,
  ): Promise<Frame[]> {
    return this.frameService.findAll(populateLevel);
  }

  @Get('findById/:id')
  getComponentById(@Param('id') id: string): Promise<Frame> {
    return this.frameService.findFrameById(id);
  }

  @Delete(':id')
  deletePanel(@Param('id') id: string): Promise<DeleteResult> {
    return this.frameService.deleteFrame(id);
  }
}
