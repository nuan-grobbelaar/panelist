import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Panel } from '../../panels/schemas/panel.schema';

export type FrameDocument = HydratedDocument<Frame>;

@Schema({ _id: false })
class FramePanel {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Panel' })
  panel: Panel;

  @Prop({ type: Object }) //TODO: fix
  position: {
    colStart: number;
    rowStart: number;
    colEnd: number;
    rowEnd: number;
  };
}

export const FramePanelSchema = SchemaFactory.createForClass(FramePanel);

@Schema()
export class Frame {
  @Prop()
  name: string;

  @Prop()
  active: boolean;

  @Prop()
  mobile: boolean;

  @Prop()
  columns: number;

  @Prop()
  rows: number;

  @Prop({ type: [FramePanel] })
  panels: FramePanel[];
}

export const FrameSchema = SchemaFactory.createForClass(Frame);
