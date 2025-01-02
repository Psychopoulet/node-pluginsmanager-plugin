import { OpenApiValidator } from "express-openapi-validate";
import DescriptorUser, { type iDescriptorUserOptions } from "./DescriptorUser";
import type { iIncomingMessage, iServerResponse } from "./Server";
export interface iIncomingMessageForMediatorValidation extends iIncomingMessage {
    "body": any;
}
export interface iServerResponseForMediatorValidation extends iServerResponse {
    "body": any;
}
export interface iUrlAllowedParameters {
    "path"?: Record<string, any>;
    "query"?: Record<string, any>;
    "headers"?: Record<string, any>;
    "cookies"?: Record<string, any>;
    "header"?: Record<string, any>;
    "cookie"?: Record<string, any>;
}
export default class Mediator extends DescriptorUser {
    protected _validator: OpenApiValidator | null;
    constructor(options: iDescriptorUserOptions);
    checkParameters(operationId: string, urlParams?: iUrlAllowedParameters, bodyParams?: any): Promise<void>;
    checkResponse(operationId: string, res: iServerResponseForMediatorValidation): Promise<void>;
    init(...data: any): Promise<void>;
    release(...data: any): Promise<void>;
}
