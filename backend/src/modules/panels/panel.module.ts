import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Panel, PanelSchema } from './schemas/panel.schema';
import { ComponentModule } from '../components/component.module';
import { PanelApiController } from './panel.controller';
import { PanelService } from './panel.service';
import { FrameModule } from '../frames/frame.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Panel.name, schema: PanelSchema }]),
    forwardRef(() => ComponentModule),
    forwardRef(() => FrameModule),
  ],
  controllers: [PanelApiController],
  providers: [PanelService],
  exports: [MongooseModule, PanelService],
})
export class PanelModule {}
