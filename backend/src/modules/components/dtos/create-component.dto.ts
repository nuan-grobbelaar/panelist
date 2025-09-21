import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsMongoId,
  IsObject,
} from 'class-validator';

export class CreateComponentDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsMongoId()
  template: string;

  @IsOptional()
  @IsObject()
  properties?: Record<string, any>;
}
