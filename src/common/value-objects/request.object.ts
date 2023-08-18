import { IRequest } from "../interfaces/request.interface";
import { SelectQueryBuilder } from "typeorm";

export class RequestObject<T> implements IRequest<T> {

  private _value: SelectQueryBuilder<T>;

  get value(): SelectQueryBuilder<T> {
    return this._value;
  }

  set value(value: SelectQueryBuilder<T>) {
    this._value = value;
  }


}