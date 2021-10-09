export class BaseResponse<T> {
  success: boolean;
  message: string;
  data: IData | IData[] | any;
  included?: IData[];
  pagination?: IPagination;

  constructor(
    message: string,
    data: T,
    tName?: string,
    options?: IResponseOptions,
  ) {
    this.success = options ? options.success : true;
    this.message = message;
    this.data = this.getData(tName, data);
    this.included = options?.included?.map(x => this.convertEntityToData(tName, x));
    this.pagination = options?.pagination;
  }

  private getData(tName: string | undefined, data: T | T[] | null): IData | IData[] | null {
    if (!data) return null;
    const jsonData = JSON.parse(JSON.stringify(data));
    if (!Array.isArray(jsonData) && Object.keys(jsonData).length === 0) return null;

    return Array.isArray(jsonData)
      ? jsonData.map(x => this.convertEntityToData(tName, x))
      : this.convertEntityToData(tName, jsonData);
  }

  private convertEntityToData(type: string | undefined, data: any): IData {
    const { _id, createdAt, updatedAt, __v, ...other } = data;
    const id = _id;
    const version = __v;

    const attributes: T = Object.keys(other).length > 0 ? other : undefined;
    const systems = createdAt && updatedAt && version >= 0
      ? { createdAt, updatedAt, version }
      : undefined;

    return id ? { type, id, attributes, systems } : data;
  }
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

// export interface IError {
//   code: string;
//   message: string;
//   detail?: string;
// }

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
