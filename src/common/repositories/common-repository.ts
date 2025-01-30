import { CommonEntity } from '../entities/common-entity';

export abstract class Query {
  page: number;
  pageSize: number;
}

export interface CommonRepository<
  T extends CommonEntity,
  Q extends Query = Query,
> {
  create(dto: any): Promise<T>;

  findById(id: string): Promise<T | null>;

  findMany(ids: string[]): Promise<T[]>;

  findAll(query: Q): Promise<T[]>;

  update(id: string, dto: any): Promise<T>;

  remove(id: string): Promise<void>;
}
