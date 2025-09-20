import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ComponentTemplateDocument = HydratedDocument<ComponentTemplate>;

@Schema({ collection: 'component_templates' })
export class ComponentTemplate {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  propertyDefinition: Record<string, any>; //TODO: replace value with property type enu
}

export const ComponentTemplateSchema =
  SchemaFactory.createForClass(ComponentTemplate);
