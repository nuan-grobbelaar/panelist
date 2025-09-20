import { IsOptional, IsString, IsArray, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export type ComparisonOperator =
  | '$eq'
  | '$ne'
  | '$gt'
  | '$gte'
  | '$lt'
  | '$lte'
  | '$in'
  | '$nin'
  | '$regex'
  | '$exists';

export class Condition {
  @IsString()
  field: string;

  @IsString()
  operator: ComparisonOperator;

  value: string; // or any type depending on field
}

export class Filter {
  @IsOptional()
  @Type(() => Filter)
  and?: Filter[];

  @IsOptional()
  @Type(() => Filter)
  or?: Filter[];

  @IsOptional()
  @Type(() => Filter)
  not?: Filter;

  @IsOptional()
  @Type(() => Condition)
  condition?: Condition;
}

export class SortClause {
  @IsString()
  field: string;

  @IsString()
  direction: 'asc' | 'desc';
}

export class GroupBy {
  @IsString()
  field: string;

  @IsOptional()
  @IsString()
  granularity?: string;

  @IsOptional()
  @Type(() => GroupBy)
  then?: GroupBy;
}

export class SearchParameters {
  @IsOptional()
  @Type(() => Filter)
  filter?: Filter;

  @IsOptional()
  @IsArray()
  @Type(() => SortClause)
  sort?: SortClause[];

  @IsOptional()
  @Type(() => GroupBy)
  groupBy?: GroupBy;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  project?: string[];

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  skip?: number;
}