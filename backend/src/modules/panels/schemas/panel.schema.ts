import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Component } from '../../components/schemas/component.schema';

export type PanelDocument = HydratedDocument<Panel>;

@Schema({ _id: false })
class DatasourceQuery {
  @Prop()
  collection: string;

  @Prop({ type: Object }) // flexible, can refine further if needed
  groupBy?: Record<string, any>;
}

export const DatasourceQuerySchema =
  SchemaFactory.createForClass(DatasourceQuery);

@Schema({ _id: false })
class Datasource {
  @Prop()
  datasourceApp: string;

  @Prop({ type: DatasourceQuerySchema })
  datasourceQuery: DatasourceQuery;
}

export const DatasourceSchema = SchemaFactory.createForClass(Datasource);

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

  @Prop({
    type: Map,
    of: DatasourceSchema,
  })
  datasources: Map<string, Datasource>;

  @Prop({ type: [PanelComponentSchema] })
  components: PanelComponent[];
}

export const PanelSchema = SchemaFactory.createForClass(Panel);
