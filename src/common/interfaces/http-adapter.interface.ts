import { IHttpResponse } from "./http-response.interface";
import { IDelete, IGet, IPost, IPut } from "./http.interface";

export interface IHttpAdapter {
    get<T = any>(data: IGet): Promise<IHttpResponse<T | any>>;
    post<T = any>(data: IPost): Promise<IHttpResponse<T | any>>;
    put<T = any>(data: IPut): Promise<IHttpResponse<T | any>>;
    delete<T = any>(data: IDelete): Promise<IHttpResponse<T | any>>;
}