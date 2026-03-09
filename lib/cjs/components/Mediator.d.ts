import { OpenApiValidator } from "express-openapi-validate";
import DescriptorUser from "./DescriptorUser";
import type { iDescriptorUserOptions, tEventMap, iEventsMinimal } from "./DescriptorUser";
import type { iServerResponse } from "./Server";
export interface iUrlAllowedParameters {
    "path"?: Record<string, unknown>;
    "query"?: Record<string, unknown>;
    "headers"?: Record<string, unknown>;
    "cookies"?: Record<string, unknown>;
    "header"?: Record<string, unknown>;
    "cookie"?: Record<string, unknown>;
}
export type iOperationHandler = (url: iUrlAllowedParameters, body: unknown) => Promise<string>;
export default class Mediator<T extends tEventMap<T> = iEventsMinimal> extends DescriptorUser<T> {
    protected _validator: OpenApiValidator | null;
    constructor(options: iDescriptorUserOptions);
    checkParameters(operationId: string, urlParams?: iUrlAllowedParameters, bodyParams?: unknown): Promise<void>;
    checkResponse(operationId: string, res: iServerResponse): Promise<void>;
    init(...data: unknown[]): Promise<void>;
    release(...data: unknown[]): Promise<void>;
}
