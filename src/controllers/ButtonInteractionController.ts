import { InteractiveClient } from "../InteractiveClient";
import { RawInteractionObject } from "../util/types/interactions";
import { InteractionControllerBase } from "./InteractionControllerBase";

export class ButtonInteractionController extends InteractionControllerBase {
  private _customId: string;

  constructor(raw: RawInteractionObject, client: InteractiveClient) {
    super(raw, client);
    this._customId = raw.data.custom_id
  }

  get customId(): string { return this._customId; }
}