import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatApiController, CatWebController } from './cat.controller';
import { CatService } from './cat.service';
import { Cat, CatSchema } from './schemas/cat.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
  controllers: [CatWebController, CatApiController],
  providers: [CatService],
})
export class CatModule {}
