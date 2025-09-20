import { Controller, Get, Query } from '@nestjs/common';
import { FramePopulateLevel, FrameService } from './frame.service';
import { Frame } from './schemas/frame.schema';

@Controller('api/frames')
export class FrameApiController {
  constructor(private readonly frameService: FrameService) {}

  @Get()
  getAllFrames(
    @Query('populateLevel') populateLevel?: FramePopulateLevel,
  ): Promise<Frame[]> {
    return this.frameService.findAll(populateLevel);
  }
}
