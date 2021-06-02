import { InteractiveClient } from "../InteractiveClient";
import { RawInteractionObject } from "../util/types/interactions";
import { InteractionControllerBase } from "./InteractionControllerBase";

export class SelectionInteractionController extends InteractionControllerBase {
    private _customId: string;
    private _selections?: string[] | undefined | null;

    constructor(raw: RawInteractionObject, client: InteractiveClient) {
        super(raw, client);
        this._customId = raw.data.custom_id || ""
        this._selections = raw.data.values
    }

    get customId(): string { return this._customId; }
    get selections(): string[] | null | undefined { return this._selections; }
}
