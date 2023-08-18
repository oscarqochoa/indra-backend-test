import { IPaginator } from "src/common/interfaces/paginator.interface";

export interface IListStarships extends IPaginator {
    nombre: string;
    modelo: string;
}
