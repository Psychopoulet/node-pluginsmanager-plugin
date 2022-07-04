/// <reference types="node" />
import Events from "events";
import { OpenApiDocument } from "express-openapi-validate";
export declare type tLogType = "data" | "debug" | "log" | "info" | "success" | "warning" | "error";
export declare type tLogger = (type: tLogType, message: string | Error, bold?: boolean, pluginName?: string) => void;
export interface iDescriptorUserOptions {
    "externalRessourcesDirectory": string;
    "descriptor"?: OpenApiDocument;
    "logger"?: tLogger;
}
export default class DescriptorUser extends Events {
    initialized: boolean;
    protected _descriptorValidated: boolean;
    protected _externalRessourcesDirectory: string;
    protected _Descriptor: OpenApiDocument | null;
    protected _Logger: tLogger | null;
    constructor(options: iDescriptorUserOptions);
    protected _initWorkSpace(...data: any): Promise<void>;
    protected _releaseWorkSpace(...data: any): Promise<void>;
    protected _log(type: tLogType, message: string | Error, bold?: boolean): this;
    getPluginName(): string;
    getPluginVersion(): string;
    getPluginDescription(): string;
    init(...data: any): Promise<void>;
    release(...data: any): Promise<void>;
    checkDescriptor(): Promise<void>;
}