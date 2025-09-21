import { DeleteResult, Model, Types } from 'mongoose';
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Frame } from './schemas/frame.schema';
import { CreateFrameDto, FramePanelDto } from "./dtos/create-frame.dto";
import { Panel } from '../panels/schemas/panel.schema';
import { PanelPopulateLevel } from '../panels/panel.service';
import { UpdatePanelDto } from '../panels/dtos/update-panel.dto';
import { UpdateFrameDto } from './dtos/update-frame.dto';
import { Component } from '../components/schemas/component.schema';

export enum FramePopulateLevel {
  FRAME = 'frame',
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

  async updatePanel(
    id: string,
    updateFrameDto: UpdateFrameDto,
  ): Promise<Frame> {
    const frame = await this.frameModel.findById(id);
    if (!frame) {
      throw new NotFoundException(`Frame with id "${id}" not found`);
    }

    Object.assign(frame, updateFrameDto);
    return frame.save();
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

  async findFrameById(id: string): Promise<Frame> {
    const frame = await this.frameModel.findById(id);
    if (!frame) {
      throw new NotFoundException(`Frame with id "${id}" not found`);
    }

    return frame;
  }

  async findFramesByPanel<P extends FramePopulateLevel | undefined = undefined>(
    panelId: string,
    populateLevel?: FramePopulateLevel,
  ): Promise<P extends undefined ? string[] : Frame[]> {
    if (!Types.ObjectId.isValid(panelId)) {
      throw new BadRequestException(`Invalid panel id: ${panelId}`);
    }

    let query = this.frameModel.find({
      'panels.panel': panelId,
    });

    switch (populateLevel) {
      case FramePopulateLevel.FRAME:
        break;

      case FramePopulateLevel.PANEL:
        query = query.populate({ path: 'panels.panel' });
        break;

      case FramePopulateLevel.COMPONENT:
        query = query.populate({
          path: 'panels.panel',
          populate: { path: 'components.component' },
        });
        break;

      case FramePopulateLevel.TEMPLATE:
        query = query.populate({
          path: 'panels.panel',
          populate: {
            path: 'components.component',
            populate: { path: 'template' },
          },
        });
        break;

      default:
        query = query.select('_id');
        break;
    }

    const frames = await query.exec();

    if (!populateLevel) {
      const ids = frames.map((c) => c._id.toString());
      return ids as P extends undefined ? string[] : never;
    }

    return frames as unknown as P extends undefined ? never : Frame[];
  }

  async deleteFrame(id: string): Promise<DeleteResult> {
    return this.frameModel.deleteOne({ _id: id }).exec();
  }
}
