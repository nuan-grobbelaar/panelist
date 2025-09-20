import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type DataDocument = HydratedDocument<Data>;

@Schema()
export class Data {
  @Prop()
  timestamp: Date;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  values: Record<string, any>;
}

export const DataSchema = SchemaFactory.createForClass(Data);
