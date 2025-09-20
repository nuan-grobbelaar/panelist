import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FrameApiController } from './frame.controller';
import { Frame, FrameSchema } from './schemas/frame.schema';
import { FrameService } from './frame.service';
import { PanelModule } from '../panels/panel.module';
import { ComponentModule } from '../components/component.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Frame.name, schema: FrameSchema }]),
    PanelModule,
    ComponentModule,
  ],
  controllers: [FrameApiController],
  providers: [FrameService],
})
export class FrameModule {}
