import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { FramePopulateLevel, FrameService } from './frame.service';
import { Frame } from './schemas/frame.schema';
import { CreateFrameDto } from './dtos/create-frame.dto';

@Controller('api/frames')
export class FrameApiController {
  constructor(private readonly frameService: FrameService) {}

  @Post('create')
  async create(@Body() body: CreateFrameDto): Promise<Frame> {
    return this.frameService.create(body);
  }

  @Get()
  getAllFrames(
    @Query('populateLevel') populateLevel?: FramePopulateLevel,
  ): Promise<Frame[]> {
    return this.frameService.findAll(populateLevel);
  }
}
