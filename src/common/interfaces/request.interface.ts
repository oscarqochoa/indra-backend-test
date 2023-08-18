import { SelectQueryBuilder } from "typeorm";

export class IRequest<T> {
  value: SelectQueryBuilder<T>;
}