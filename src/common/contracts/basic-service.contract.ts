export interface BasicServiceContract<T> {
    show(params: any): Promise<T>;
    get(params: any): Promise<T[]>;
    list(params: any): Promise<T[]>;
    create(params: any): Promise<T[] | null>;
    update(params: any): Promise<T[] | null>;
    delete(params: any): Promise<T[] | null>;
}