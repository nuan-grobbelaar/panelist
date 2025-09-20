import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Panel, PanelSchema } from './schemas/panel.schema';
import { ComponentModule } from '../components/component.module';
import { PanelApiController } from './panel.controller';
import { PanelService } from './panel.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Panel.name, schema: PanelSchema }]),
    ComponentModule,
  ],
  controllers: [PanelApiController],
  providers: [PanelService],
  exports: [MongooseModule],
})
export class PanelModule {}
