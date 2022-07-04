import { OpenApiValidator } from "express-openapi-validate";
import { iServerResponse } from "./Server";
import DescriptorUser, { iDescriptorUserOptions } from "./DescriptorUser";
export interface iUrlParameters {
    "path": object;
    "query": object;
    "headers": object;
    "cookies": object;
}
export interface iBodyParameters {
    [key: string]: any;
}
export default class Mediator extends DescriptorUser {
    protected _validator: OpenApiValidator | null;
    constructor(options: iDescriptorUserOptions);
    checkParameters(operationId: string, urlParams: iUrlParameters, bodyParams: iBodyParameters): Promise<void>;
    checkResponse(operationId: string, res: iServerResponse): Promise<void>;
    init(...data: any): Promise<void>;
    release(...data: any): Promise<void>;
}