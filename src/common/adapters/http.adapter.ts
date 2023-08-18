import axios from "axios";
import { IHttpAdapter } from "src/common/interfaces/http-adapter.interface";
import { IHttpResponse } from "src/common/interfaces/http-response.interface";

import { IDelete, IGet, IPost, IPut } from "src/common/interfaces/http.interface";

export class HttpAdapter implements IHttpAdapter {

    async get<T = any>(requestData: IGet): Promise<IHttpResponse<T | any>> {
        return await axios.get<IHttpResponse<T>>(requestData.url + '/' + requestData.param, { params: requestData.queryParams })
    }

    async post<T = any>(data: IPost): Promise<IHttpResponse<T | any>> {
        return await axios.post<IHttpResponse<T>>(data.url, { params: data.body });
    }

    async put<T = any>(data: IPut): Promise<IHttpResponse<T | any>> {
        return await axios.put<IHttpResponse<T>>(data.url + '/' + data.param, data.body);
    }

    async delete<T = any>(data: IDelete): Promise<IHttpResponse<T | any>> {
        return await axios.delete<IHttpResponse<T>>(data.url + '/' + data.param);
    }

}