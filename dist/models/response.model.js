"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseResponse = void 0;
class BaseResponse {
    constructor(message, data, tName, options) {
        this.success = options ? options.success : true;
        this.message = message;
        this.data = this.getData(tName, data);
        this.included = options?.included?.map(x => this.convertEntityToData(tName, x));
        this.pagination = options?.pagination;
    }
    getData(tName, data) {
        if (!data)
            return null;
        const jsonData = JSON.parse(JSON.stringify(data));
        if (!Array.isArray(jsonData) && Object.keys(jsonData).length === 0)
            return null;
        return Array.isArray(jsonData)
            ? jsonData.map(x => this.convertEntityToData(tName, x))
            : this.convertEntityToData(tName, jsonData);
    }
    convertEntityToData(type, data) {
        const { _id, createdAt, updatedAt, __v, ...other } = data;
        const id = _id;
        const version = __v;
        const attributes = Object.keys(other).length > 0 ? other : undefined;
        const systems = createdAt && updatedAt && version >= 0
            ? { createdAt, updatedAt, version }
            : undefined;
        return id ? { type, id, attributes, systems } : data;
    }
}
exports.BaseResponse = BaseResponse;
//# sourceMappingURL=response.model.js.map