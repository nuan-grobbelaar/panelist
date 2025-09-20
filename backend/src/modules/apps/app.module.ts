import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { App, AppSchema } from './schema/app.schema';
import { Collection, CollectionSchema } from './schema/collection.schema';
import { AppController } from './app.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: App.name, schema: AppSchema },
      { name: Collection.name, schema: CollectionSchema },
    ]),
  ],
  providers: [AppService],
  controllers: [AppController],
  exports: [AppService],
})
export class AppModule {}
