import { Repository, SelectQueryBuilder } from "typeorm";
import { IRequest } from "../interfaces/request.interface";
import { RequestObject } from "../value-objects/request.object";

export class RequestHelper<T> {

  constructor(
    private readonly repository: Repository<T>,
    private readonly alias: string,
    private readonly args: any
  ) {
  }

  queryBuilder(): QueryBuilder<T> {
    return new QueryBuilder<T>(this.repository, this.alias, this.args);
  }

}

export class QueryBuilder<T> {

  private _query: IRequest<T>;

  get query(): IRequest<T> {
    return this._query;
  }

  set query(value: IRequest<T>) {
    this._query = value;
  }

  constructor(
    private readonly repository: Repository<T>,
    private readonly alias: string,
    private readonly args: any
  ) {
  }

  create(): this {
    // Create query
    const query: IRequest<T> = new RequestObject();
    query.value = this.repository.createQueryBuilder(this.alias);

    this.query = query;

    return this;
  }

  getInstance(): SelectQueryBuilder<T> {
    return this.query.value;
  }

  applyPaginator(limit: number, page: number): this {

    const offset = limit * page;

    this.query.value.limit(limit).offset(offset);

    return this;
  }

  applyFilters(callback: (query: IRequest<T>, args: any) => void): this {
    callback(this.query, this.args);
    return this;
  }

}