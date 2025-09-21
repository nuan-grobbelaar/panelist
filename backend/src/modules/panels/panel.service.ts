import { Model, Types } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Panel } from './schemas/panel.schema';
import { CreateFrameDto, FramePanelDto } from '../frames/dtos/create-frame.dto';
import { Frame } from '../frames/schemas/frame.schema';
import { CreatePanelDto, PanelComponentDto } from './dtos/create-panel.dto';

export enum PanelPopulateLevel {
  TEMPLATE = 'template',
  COMPONENT = 'component',
}

@Injectable()
export class PanelService {
  constructor(@InjectModel(Panel.name) private panelModel: Model<Panel>) {}

  async create(createPanelDto: CreatePanelDto): Promise<Panel> {
    const componentsWithObjectId = createPanelDto.components.map(
      (componentDto: PanelComponentDto) => ({
        ...componentDto,
        component: new Types.ObjectId(componentDto.component),
      }),
    );

    const createdPanel = new this.panelModel({
      ...createPanelDto,
      components: componentsWithObjectId,
    });

    return createdPanel.save();
  }

  async findAll(populateLevel?: PanelPopulateLevel): Promise<Panel[]> {
    let populateOption = undefined;

    if (populateLevel == PanelPopulateLevel.TEMPLATE) {
      populateOption = {
        path: 'components.component',
        populate: { path: 'template' },
      };
    } else if (populateLevel == PanelPopulateLevel.COMPONENT) {
      populateOption = {
        path: 'components.component',
      };
    } else if (populateLevel) {
      const validOptions = Object.values(PanelPopulateLevel).join(', ');
      throw new BadRequestException(
        `Invalid populateLevel: ${String(populateLevel)}. Valid options: ${validOptions}`,
      );
    }

    let query = this.panelModel.find();

    if (populateOption) {
      query = query.populate(populateOption);
    }

    return query.exec();
  }
}
