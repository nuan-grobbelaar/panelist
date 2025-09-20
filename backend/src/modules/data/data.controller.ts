import { Controller, Post, Param, Body } from '@nestjs/common';
import { DataService } from './data.service';
import { SearchParameters } from './dtos/search-parameters.dto';

@Controller('api/data')
export class DataApiController {
  constructor(private readonly dataService: DataService) {}

  @Post(':app/datasource/:datasource')
  async getAll(
    @Param('app') app: string,
    @Param('datasource') datasource: string,
    @Body() params: SearchParameters,
  ) {
    return this.dataService.findAll(app, datasource, params);
  }
}
