import InteractiveClient from "..";
import { RawInteractionObject } from "../util/types/interactions";
import { InteractionControllerBase } from "./InteractionControllerBase";

export class CommandInteractionController extends InteractionControllerBase {
    constructor(raw: RawInteractionObject, client: InteractiveClient) {
    super(raw, client);
  }
}