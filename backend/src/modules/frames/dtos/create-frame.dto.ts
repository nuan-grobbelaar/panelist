import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';

class PositionDto {
  @IsInt()
  colStart: number;

  @IsInt()
  rowStart: number;

  @IsInt()
  colEnd: number;

  @IsInt()
  rowEnd: number;
}

export class FramePanelDto {
  @IsNotEmpty()
  panel: string;

  @ValidateNested()
  @Type(() => PositionDto)
  position: PositionDto;
}

export class CreateFrameDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsBoolean()
  @IsOptional()
  mobile?: boolean;

  @IsInt()
  columns: number;

  @IsInt()
  rows: number;

  @ValidateNested({ each: true })
  @Type(() => FramePanelDto)
  @ArrayMinSize(1)
  panels: FramePanelDto[];
}
