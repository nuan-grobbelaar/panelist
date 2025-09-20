import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Collection, CollectionSchema } from './collection.schema';

export type AppDocument = HydratedDocument<App>;

@Schema()
export class App {
  @Prop({ unique: true })
  name: string;

  @Prop({ type: [CollectionSchema] })
  collection: Collection[];
}

export const AppSchema = SchemaFactory.createForClass(App);
