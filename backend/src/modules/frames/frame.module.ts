import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FrameApiController } from './frame.controller';
import { Frame, FrameSchema } from './schemas/frame.schema';
import { FrameService } from './frame.service';
import { PanelModule } from '../panels/panel.module';
import { ComponentModule } from '../components/component.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Frame.name, schema: FrameSchema }]),
    ComponentModule,
    forwardRef(() => PanelModule),
  ],
  controllers: [FrameApiController],
  providers: [FrameService],
  exports: [FrameService],
})
export class FrameModule {}
