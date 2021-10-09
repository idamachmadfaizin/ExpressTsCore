export declare class BaseResponse<T> {
    success: boolean;
    message: string;
    data: IData | IData[] | any;
    included?: IData[];
    pagination?: IPagination;
    constructor(message: string, data: T, tName?: string, options?: IResponseOptions);
    private getData;
    private convertEntityToData;
}
interface IResponseOptions {
    success: boolean;
    included?: any[];
    pagination?: IPagination;
}
interface IType {
    type: string | null;
}
export interface IData extends IType {
    id: string;
    attributes?: any;
    systems?: ISystems;
}
export interface ISystems {
    createdAt: Date;
    updatedAt: Date;
    version: number;
}
export interface IPagination {
    currentPage: number;
    firstPage: number;
    prevPage: number | null;
    nextPage: number | null;
    lastPage: number;
    perPage: number;
    pageEntries: number;
    totalPage: number;
}
export {};
