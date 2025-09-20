import { join } from 'path';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { MainController } from './main.controller';
import { MainService } from './main.service';
import { FrameModule } from './modules/frames/frame.module';
import { PanelModule } from './modules/panels/panel.module';
import { ComponentModule } from './modules/components/component.module';
import { DatabaseModule } from './modules/databases/database.module';
import { DataModule } from './modules/data/data.module';
import { AppModule } from './modules/apps/app.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/app'),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    FrameModule,
    PanelModule,
    ComponentModule,
    DatabaseModule,
    DataModule,
    AppModule,
  ],
  controllers: [MainController],
  providers: [MainService],
})
export class MainModule {}
