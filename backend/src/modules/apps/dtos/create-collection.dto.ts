import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

class FieldDefinitionDto {
  @IsString()
  type: string;

  @IsOptional()
  required?: boolean;

  @IsOptional()
  ref?: string;
}

export class CreateCollectionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsObject()
  schema: Record<string, FieldDefinitionDto>;
}
