import DescriptorUser from "./DescriptorUser";
import Mediator from "./Mediator";
import type { iDescriptorUserOptions, tEventMap, tEventsNoEvent } from "./DescriptorUser";
export interface iMediatorUserOptions extends iDescriptorUserOptions {
    "mediator"?: Mediator;
}
export default class MediatorUser<T extends tEventMap<T> = tEventsNoEvent> extends DescriptorUser<T> {
    protected _Mediator: Mediator | null;
    constructor(options: iMediatorUserOptions);
    protected _initWorkSpace(...data: any): Promise<void>;
    protected _releaseWorkSpace(...data: any): Promise<void>;
    checkMediator(): Promise<void>;
}
