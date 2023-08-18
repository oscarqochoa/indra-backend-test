export interface IGet {
    url: string;
    param?: string | number;
    queryParams?: object;
}

export interface IPost {
    url: string;
    body: object;
}

export interface IPut {
    url: string;
    param?: string | number;
    body: object;
}

export interface IDelete {
    url: string;
    param: string | number
}