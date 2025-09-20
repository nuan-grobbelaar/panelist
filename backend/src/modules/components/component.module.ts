import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Component, ComponentSchema } from './schemas/component.schema';
import {
  ComponentTemplate,
  ComponentTemplateSchema,
} from './schemas/component_template.schema';
import { ComponentApiController } from './component.controller';
import { ComponentService } from './component.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Component.name, schema: ComponentSchema },
      { name: ComponentTemplate.name, schema: ComponentTemplateSchema },
    ]),
  ],
  controllers: [ComponentApiController],
  providers: [ComponentService],
  exports: [MongooseModule],
})
export class ComponentModule {}
