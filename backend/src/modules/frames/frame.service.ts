import { Model, Types } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Frame } from './schemas/frame.schema';
import { CreateFrameDto, FramePanelDto } from "./dtos/create-frame.dto";

export enum FramePopulateLevel {
  TEMPLATE = 'template',
  COMPONENT = 'component',
  PANEL = 'panel',
}

@Injectable()
export class FrameService {
  constructor(@InjectModel(Frame.name) private frameModel: Model<Frame>) {}

  async create(createFrameDto: CreateFrameDto): Promise<Frame> {
    const panelsWithObjectId = createFrameDto.panels.map(
      (panelDto: FramePanelDto) => ({
        ...panelDto,
        panel: new Types.ObjectId(panelDto.panel),
      }),
    );

    const createdFrame = new this.frameModel({
      ...createFrameDto,
      panels: panelsWithObjectId,
    });

    return createdFrame.save();
  }

  async findAll(populateLevel?: FramePopulateLevel): Promise<Frame[]> {
    let populateOption = undefined;

    if (populateLevel == FramePopulateLevel.TEMPLATE) {
      populateOption = {
        path: 'panels.panel',
        populate: {
          path: 'components.component',
          populate: { path: 'template' },
        },
      };
    } else if (populateLevel == FramePopulateLevel.COMPONENT) {
      populateOption = {
        path: 'panels.panel',
        populate: { path: 'components.component' },
      };
    } else if (populateLevel == FramePopulateLevel.PANEL) {
      populateOption = { path: 'panels.panel' };
    } else if (populateLevel) {
      const validOptions = Object.values(FramePopulateLevel).join(', ');
      throw new BadRequestException(
        `Invalid populateLevel: ${String(populateLevel)}. Valid options: ${validOptions}`,
      );
    }

    let query = this.frameModel.find();

    if (populateOption) {
      query = query.populate(populateOption);
    }

    return query.exec();
  }
}
