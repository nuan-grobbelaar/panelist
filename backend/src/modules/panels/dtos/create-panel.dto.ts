import {
  IsString,
  IsNumber,
  IsOptional,
  ValidateNested,
  IsObject,
  IsDefined,
  IsMongoId,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class DatasourceQueryDto {
  @IsString()
  collection: string;

  @IsOptional()
  @IsObject()
  groupBy?: Record<string, any>;
}

export class DatasourceDto {
  @IsString()
  datasourceApp: string;

  @ValidateNested()
  @Type(() => DatasourceQueryDto)
  datasourceQuery: DatasourceQueryDto;
}

export class PanelComponentPositionDto {
  @IsNumber()
  colStart: number;

  @IsNumber()
  rowStart: number;

  @IsNumber()
  colEnd: number;

  @IsNumber()
  rowEnd: number;
}

export class PanelComponentDto {
  @IsMongoId()
  component: string;

  @ValidateNested()
  @Type(() => PanelComponentPositionDto)
  position: PanelComponentPositionDto;
}

export class CreatePanelDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  columns: number;

  @IsNumber()
  rows: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => DatasourceDto)
  datasources?: Record<string, DatasourceDto>;

  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => PanelComponentDto)
  components: PanelComponentDto[];
}
