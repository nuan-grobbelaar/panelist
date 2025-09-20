import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
  // controllers: [DatabaseApiController],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
