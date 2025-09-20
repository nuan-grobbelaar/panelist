import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ComponentTemplate } from './component_template.schema';

export type ComponentDocument = HydratedDocument<Component>;

@Schema()
export class Component {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ComponentTemplate' })
  template: ComponentTemplate;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  properties: Record<string, any>;
}

export const ComponentSchema = SchemaFactory.createForClass(Component);
