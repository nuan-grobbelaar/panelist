import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../databases/database.service';
import { Data, DataSchema } from './schemas/data.schema';
import { SearchParameters } from './dtos/search-parameters.dto';
import { buildMongoQuery } from '../../util/Query';
import { AppService } from '../apps/app.service';

@Injectable()
export class DataService {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly appService: AppService,
  ) {}

  async findAll(
    dbName: string,
    collection: string,
    params: SearchParameters,
  ): Promise<Data[]> {
    const apps = await this.appService.findAll({ name: dbName });

    if (!apps || apps.length == 0)
      throw new NotFoundException(`App '${dbName}' not found`);

    if (apps.length > 1)
      throw new ConflictException(
        `Found multiple Apps that matches name '${dbName}'`,
      );

    const collectionDefinition = Object.entries(apps[0].collection).find(
      (c) => c[1].name == collection,
    );

    if (!collectionDefinition)
      throw new NotFoundException(
        `Collection '${collection}' not found in App '${dbName}'`,
      );

    //TODO: validate search parameters against collection schema

    const model = this.dbService.getModel(
      dbName,
      'data',
      DataSchema,
      collection,
    );

    const { filter, projection, options } = buildMongoQuery(params);

    return model.find(filter, projection, options).exec();
  }
}
