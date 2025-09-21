import { Model, Types } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Component } from './schemas/component.schema';
import { ComponentTemplate } from './schemas/component_template.schema';
import { CreateComponentTemplateDto } from './dtos/create-component-template.dto';
import { CreateComponentDto } from './dtos/create-component.dto';

export enum ComponentPopulateLevel {
  TEMPLATE = 'template',
}

@Injectable()
export class ComponentService {
  constructor(
    @InjectModel(Component.name)
    private componentModel: Model<Component>,
    @InjectModel(ComponentTemplate.name)
    private componentTemplateModel: Model<ComponentTemplate>,
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

  async createComponentTemplate(
    createComponentTemplateDto: CreateComponentTemplateDto,
  ): Promise<ComponentTemplate> {
    const createdComponentTemplate = new this.componentTemplateModel(
      createComponentTemplateDto,
    );
    return createdComponentTemplate.save();
  }

  async findAllComponentTemplates(): Promise<ComponentTemplate[]> {
    return this.componentTemplateModel.find().exec();
  }
}
