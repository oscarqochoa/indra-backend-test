export interface IHttpResponse<T = any> {
    data: T;
    headers: any;
    status: any;
}