import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ComponentTemplateDocument = HydratedDocument<ComponentTemplate>;

@Schema({ _id: false })
export class PropertyDefinition {
  @Prop({ type: Boolean, required: true })
  required: boolean;

  @Prop({
    type: String,
    required: true,
    enum: ['string', 'number', 'boolean', 'object'], //TODO: more
  })
  type: string;
}

export const PropertyDefinitionSchema =
  SchemaFactory.createForClass(PropertyDefinition);

@Schema({ collection: 'component_templates' })
export class ComponentTemplate {
  @Prop({ unique: true })
  name: string;

  @Prop({ type: Map, of: PropertyDefinitionSchema })
  propertyDefinition: Record<string, PropertyDefinition>;
}

export const ComponentTemplateSchema =
  SchemaFactory.createForClass(ComponentTemplate);
