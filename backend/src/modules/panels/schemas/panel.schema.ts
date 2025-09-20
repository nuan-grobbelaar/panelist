import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Component } from '../../components/schemas/component.schema';

export type PanelDocument = HydratedDocument<Panel>;

@Schema({ _id: false })
class PanelComponent {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Component' })
  component: Component;

  @Prop({ type: Object }) //TODO: fix
  position: {
    colStart: number;
    rowStart: number;
    colEnd: number;
    rowEnd: number;
  };
}

export const PanelComponentSchema =
  SchemaFactory.createForClass(PanelComponent);

@Schema()
export class Panel {
  @Prop()
  name: string;

  @Prop()
  columns: number;

  // @Prop()
  // datasources: {};

  @Prop({ type: [PanelComponentSchema] })
  components: PanelComponent[];
}

export const PanelSchema = SchemaFactory.createForClass(Panel);
