import { DeleteResult, Model, Types } from 'mongoose';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Panel } from './schemas/panel.schema';
import { CreatePanelDto, PanelComponentDto } from './dtos/create-panel.dto';
import { FrameService } from '../frames/frame.service';
import { UpdatePanelDto } from './dtos/update-panel.dto';

export enum PanelPopulateLevel {
  TEMPLATE = 'template',
  COMPONENT = 'component',
  PANEL = 'panel',
}

@Injectable()
export class PanelService {
  constructor(
    @InjectModel(Panel.name) private panelModel: Model<Panel>,
    private readonly frameService: FrameService,
  ) {}

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

  async updatePanel(
    id: string,
    updatePanelDto: UpdatePanelDto,
  ): Promise<Panel> {
    const panel = await this.panelModel.findById(id);
    if (!panel) {
      throw new NotFoundException(`Panel with id "${id}" not found`);
    }

    Object.assign(panel, updatePanelDto);
    return panel.save();
  }

  async findAll(populateLevel?: PanelPopulateLevel): Promise<Panel[]> {
    let populateOption = undefined;

    //TODO: fix
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

  async findPanelById(id: string): Promise<Panel> {
    const panel = await this.panelModel.findById(id);
    if (!panel) {
      throw new NotFoundException(`Panel with id "${id}" not found`);
    }

    return panel;
  }

  async findPanelsByComponent<
    P extends PanelPopulateLevel | undefined = undefined,
  >(
    componentId: string,
    populateLevel?: PanelPopulateLevel,
  ): Promise<P extends undefined ? string[] : Panel[]> {
    if (!Types.ObjectId.isValid(componentId)) {
      throw new BadRequestException(`Invalid component id: ${componentId}`);
    }

    let query = this.panelModel.find({
      'components.component': componentId,
    });

    switch (populateLevel) {
      case PanelPopulateLevel.PANEL:
        break;

      case PanelPopulateLevel.COMPONENT:
        query = query.populate({
          path: 'components.component',
        });
        break;

      case PanelPopulateLevel.TEMPLATE:
        query = query.populate({
          path: 'components.component',
          populate: { path: 'template' },
        });
        break;

      default:
        query = query.select('_id');
        break;
    }

    const panels = await query.exec();

    if (!populateLevel) {
      const ids = panels.map((c) => c._id.toString());
      return ids as P extends undefined ? string[] : never;
    }

    return panels as unknown as P extends undefined ? never : Panel[];
  }

  async deletePanel(id: string): Promise<DeleteResult> {
    const frames = await this.frameService.findFramesByPanel(id);

    if (frames.length > 0)
      throw new ConflictException(
        `Panel with id '${id}' can't be deleted because it is used by these Frames: [${frames.join(', ')}]`,
      );

    return this.panelModel.deleteOne({ _id: id }).exec();
  }
}
