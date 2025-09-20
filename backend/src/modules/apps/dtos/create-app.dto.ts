import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCollectionDto } from './create-collection.dto';

export class CreateAppDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateNested()
  @Type(() => CreateCollectionDto)
  collection: CreateCollectionDto[];
}
