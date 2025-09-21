import { DeleteResult, Model, Types } from 'mongoose';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Component } from './schemas/component.schema';
import { ComponentTemplate } from './schemas/component_template.schema';
import { CreateComponentTemplateDto } from './dtos/create-component-template.dto';
import { CreateComponentDto } from './dtos/create-component.dto';
import { UpdateComponentTemplateDto } from './dtos/update-component-template.dto';
import { UpdateComponentDto } from './dtos/update-component.dto';
import { PanelService } from '../panels/panel.service';

export enum ComponentPopulateLevel {
  COMPONENT = 'component',
  TEMPLATE = 'template',
}

@Injectable()
export class ComponentService {
  constructor(
    @InjectModel(Component.name)
    private componentModel: Model<Component>,
    @InjectModel(ComponentTemplate.name)
    private componentTemplateModel: Model<ComponentTemplate>,
    private readonly panelService: PanelService,
  ) {}

  async createComponent(
    createComponentDto: CreateComponentDto,
  ): Promise<Component> {
    const componentWithObjectId = {
      ...createComponentDto,
      template: new Types.ObjectId(createComponentDto.template),
    };

    const createdComponent = new this.componentModel(componentWithObjectId);

    return createdComponent.save();
  }

  async updateComponent(
    id: string,
    updateComponentDto: UpdateComponentDto,
  ): Promise<Component> {
    const component = await this.componentModel.findById(id);
    if (!component) {
      throw new NotFoundException(`Component with id "${id}" not found`);
    }

    Object.assign(component, updateComponentDto);
    return component.save();
  }

  async findComponentById(id: string): Promise<Component> {
    const component = await this.componentModel.findById(id);
    if (!component) {
      throw new NotFoundException(`Component with id "${id}" not found`);
    }

    return component;
  }

  async findAllComponents(
    populateLevel?: ComponentPopulateLevel,
  ): Promise<Component[]> {
    let query = this.componentModel.find();

    if (populateLevel == ComponentPopulateLevel.TEMPLATE) {
      query = query.populate({ path: 'template' });
    } else if (populateLevel) {
      const validOptions = Object.values(ComponentPopulateLevel).join(', ');
      throw new BadRequestException(
        `Invalid populateLevel: ${String(populateLevel)}. Valid options: ${validOptions}`,
      );
    }

    return query.exec();
  }

  async findComponentsByTemplate<
    P extends ComponentPopulateLevel | undefined = undefined,
  >(
    templateId: string,
    populateLevel?: ComponentPopulateLevel,
  ): Promise<P extends undefined ? string[] : Component[]> {
    if (!Types.ObjectId.isValid(templateId)) {
      throw new BadRequestException(`Invalid template id: ${templateId}`);
    }

    let query = this.componentModel.find({ template: templateId });

    switch (populateLevel) {
      case ComponentPopulateLevel.COMPONENT:
        break;

      case ComponentPopulateLevel.TEMPLATE:
        query = query.populate('template');
        break;

      default:
        query = query.select('_id');
        break;
    }

    const components = await query.exec();

    if (!populateLevel) {
      const ids = components.map((c) => c._id.toString());
      return ids as P extends undefined ? string[] : never;
    }

    return components as unknown as P extends undefined ? never : Component[];
  }

  async deleteComponent(id: string): Promise<DeleteResult> {
    const panels = await this.panelService.findPanelsByComponent(id);

    if (panels.length > 0)
      throw new ConflictException(
        `Component with id '${id}' can't be deleted because it is used by these Panels: [${panels.join(', ')}]`,
      );

    return this.componentModel.deleteOne({ _id: id }).exec();;
  }

  async createComponentTemplate(
    createComponentTemplateDto: CreateComponentTemplateDto,
  ): Promise<ComponentTemplate> {
    const createdComponentTemplate = new this.componentTemplateModel(
      createComponentTemplateDto,
    );
    return createdComponentTemplate.save();
  }

  async updateComponentTemplate(
    id: string,
    updateComponentTemplateDto: UpdateComponentTemplateDto,
  ): Promise<ComponentTemplate> {
    const componentTemplate = await this.componentTemplateModel.findById(id);
    if (!componentTemplate) {
      throw new NotFoundException(
        `ComponentTemplate with id "${id}" not found`,
      );
    }

    Object.assign(componentTemplate, updateComponentTemplateDto);
    return componentTemplate.save();
  }

  async findComponentTemplateById(id: string): Promise<ComponentTemplate> {
    const componentTemplate = await this.componentTemplateModel.findById(id);
    if (!componentTemplate) {
      throw new NotFoundException(
        `ComponentTemplate with id "${id}" not found`,
      );
    }

    return componentTemplate;
  }

  async findAllComponentTemplates(): Promise<ComponentTemplate[]> {
    return this.componentTemplateModel.find().exec();
  }

  async deleteComponentTemplate(id: string): Promise<DeleteResult> {
    const components = await this.findComponentsByTemplate(id);

    if (components.length > 0)
      throw new ConflictException(
        `Template with id '${id}' can't be deleted because it is used by these Components: [${components.join(', ')}]`,
      );

    return this.componentTemplateModel.deleteOne({ _id: id }).exec();
  }
}
