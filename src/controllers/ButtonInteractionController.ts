import { InteractiveClient } from "../InteractiveClient";
import { RawInteractionObject } from "../util/types/interactions";
import { InteractionControllerBase } from "./InteractionControllerBase";

export class ButtonInteractionController extends InteractionControllerBase {
  constructor(raw: RawInteractionObject, client: InteractiveClient) {
    super(raw, client);
  }
}