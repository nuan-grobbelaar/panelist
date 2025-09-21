import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model } from 'mongoose';
import { App, AppDocument } from './schema/app.schema';
import { CreateAppDto } from './dtos/create-app.dto';
import { UpdateAppDto } from './dtos/update-app.dto';

@Injectable()
export class AppService {
  constructor(@InjectModel(App.name) private appModel: Model<AppDocument>) {}

  async createApp(createAppDto: CreateAppDto): Promise<App> {
    const newApp = new this.appModel(createAppDto);
    return newApp.save();
  }

  async updateApp(id: string, updateAppDto: UpdateAppDto): Promise<App> {
    const app = await this.appModel.findById(id);
    if (!app) {
      throw new NotFoundException(`App with id "${id}" not found`);
    }

    Object.assign(app, updateAppDto);
    return app.save();
  }

  async findAll(searchParams?: Partial<CreateAppDto>): Promise<App[]> {
    const filter = searchParams || {};
    return this.appModel.find(filter).exec();
  }

  async deleteApp(id: string): Promise<DeleteResult> {
    return this.appModel.deleteOne({ _id: id }).exec();
  }
}
