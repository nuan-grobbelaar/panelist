import { FindOptions, Filter as MongoFilter } from 'mongodb';
import {
  Filter,
  SearchParameters,
  SortClause,
} from '../modules/data/dtos/search-parameters.dto';
import { FilterQuery, QueryOptions } from 'mongoose';

export function buildMongoFilter<T>(filter?: Filter): FilterQuery<T> {
  if (!filter) return {};

  if (filter.condition) {
    const { field, operator, value } = filter.condition;
    return { [field]: { [operator]: value } } as FilterQuery<T>;
  }

  if (filter.and) {
    return { $and: filter.and.map(buildMongoFilter) } as FilterQuery<T>;
  }

  if (filter.or) {
    return { $or: filter.or.map(buildMongoFilter) } as FilterQuery<T>;
  }

  if (filter.not) {
    return { $not: buildMongoFilter(filter.not) } as FilterQuery<T>;
  }

  return {};
}

export function buildMongoSort(sort?: SortClause[]): Record<string, 1 | -1> {
  if (!sort || sort.length === 0) return {};

  return sort.reduce(
    (acc, { field, direction }) => {
      acc[field] = direction === 'asc' ? 1 : -1;
      return acc;
    },
    {} as Record<string, 1 | -1>,
  );
}

export function buildMongoQuery<T>(params: SearchParameters) {
  const filter = buildMongoFilter(params.filter);
  const sort = buildMongoSort(params.sort);

  const projection = params.project
    ? params.project.reduce((acc, f) => ({ ...acc, [f]: 1 }), {})
    : undefined;

  const options: QueryOptions<T> = {};
  if (params.limit) options.limit = params.limit;
  if (params.skip) options.skip = params.skip;
  if (Object.keys(sort).length > 0) options.sort = sort;

  return { filter, projection, options };
}
