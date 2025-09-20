import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Component } from './schemas/component.schema';
import { ComponentTemplate } from './schemas/component_template.schema';

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

  // async create(createCatDto: CreateCatDto): Promise<Cat> {
  //   const createdCat = new this.catModel(createCatDto);
  //   return createdCat.save();
  // }

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

  async findAllComponentTemplates(): Promise<ComponentTemplate[]> {
    return this.componentTemplateModel.find().exec();
  }
}
