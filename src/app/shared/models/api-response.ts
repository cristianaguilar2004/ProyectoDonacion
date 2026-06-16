import { TypeResponse } from "../enums";

export interface ApiResponseData<TEntity> {
    type: TypeResponse,
    message: string,
    data: TEntity
}