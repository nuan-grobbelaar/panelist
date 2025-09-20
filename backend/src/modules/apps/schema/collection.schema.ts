import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CollectionDocument = HydratedDocument<Collection>;

@Schema({ _id: false })
export class Collection {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  schema: Record<string, any>;
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
