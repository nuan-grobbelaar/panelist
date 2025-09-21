import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsIn,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PropertyDefinitionDto {
  @IsBoolean()
  required: boolean;

  @IsString()
  @IsIn(['string', 'number', 'boolean', 'object'])
  type: string;
}

export class CreateComponentTemplateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => PropertyDefinitionDto)
  propertyDefinition?: Record<string, PropertyDefinitionDto>;
}
