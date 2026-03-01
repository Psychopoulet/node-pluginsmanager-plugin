import { EventEmitter } from "node:events";
import type { OpenApiDocument } from "express-openapi-validate";
export type tLogType = "data" | "debug" | "log" | "info" | "success" | "warning" | "error";
export type tLogger = (type: tLogType, message: string | Error, bold?: boolean, pluginName?: string) => void;
export interface iDescriptorUserOptions {
    "externalResourcesDirectory": string;
    "descriptor"?: OpenApiDocument;
    "logger"?: tLogger;
}
export type tEventMap<T> = Record<keyof T, unknown[]>;
export interface iEventsNoEvent {
}
export interface iEventsMinimal {
    "error": [Error];
    "initialized": [unknown];
    "released": [unknown];
}
export default class DescriptorUser<T extends tEventMap<T> = iEventsNoEvent> extends EventEmitter<T> {
    initialized: boolean;
    protected _descriptorValidated: boolean;
    protected _externalResourcesDirectory: string;
    protected _Descriptor: OpenApiDocument | null;
    protected _Logger: tLogger | null;
    constructor(options: iDescriptorUserOptions);
    protected _initWorkSpace(...data: unknown[]): Promise<void>;
    protected _releaseWorkSpace(...data: unknown[]): Promise<void>;
    protected _log(type: tLogType, message: string | Error, bold?: boolean): this;
    getPluginName(): string;
    getPluginVersion(): string;
    getPluginDescription(): string;
    init(...data: unknown[]): Promise<void>;
    release(...data: unknown[]): Promise<void>;
    checkDescriptor(): Promise<void>;
}
