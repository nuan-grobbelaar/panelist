import { PartialType } from '@nestjs/mapped-types';
import { CreateComponentTemplateDto } from './create-component-template.dto';

export class UpdateComponentTemplateDto extends PartialType(
  CreateComponentTemplateDto,
) {}
