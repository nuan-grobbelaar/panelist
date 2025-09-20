import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataApiController } from './data.controller';
import { DatabaseModule } from '../databases/database.module';
import { AppModule } from '../apps/app.module';

@Module({
  imports: [DatabaseModule, AppModule],
  controllers: [DataApiController],
  providers: [DataService],
})
export class DataModule {}
