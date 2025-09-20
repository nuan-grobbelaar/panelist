import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { App, AppDocument } from './schema/app.schema';
import { CreateAppDto } from './dtos/create-app.dto';

@Injectable()
export class AppService {
  constructor(@InjectModel(App.name) private appModel: Model<AppDocument>) {}

  async createApp(createAppDto: CreateAppDto): Promise<App> {
    const newApp = new this.appModel(createAppDto);
    return newApp.save();
  }

  async findAll(searchParams?: Partial<CreateAppDto>): Promise<App[]> {
    const filter = searchParams || {};
    return this.appModel.find(filter).exec();
  }
}
