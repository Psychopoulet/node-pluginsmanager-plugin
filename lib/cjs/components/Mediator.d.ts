import { OpenApiValidator } from "express-openapi-validate";
import DescriptorUser from "./DescriptorUser";
import type { iDescriptorUserOptions, tEventMap, iEventsMinimal } from "./DescriptorUser";
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
export default class Mediator<T extends tEventMap<T> = iEventsMinimal> extends DescriptorUser<T> {
    protected _validator: OpenApiValidator | null;
    constructor(options: iDescriptorUserOptions);
    checkParameters(operationId: string, urlParams?: iUrlAllowedParameters, bodyParams?: any): Promise<void>;
    checkResponse(operationId: string, res: iServerResponseForMediatorValidation): Promise<void>;
    init(...data: any): Promise<void>;
    release(...data: any): Promise<void>;
}
