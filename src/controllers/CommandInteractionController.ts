import InteractiveClient from "..";
import { RawInteractionObject } from "../util/types/interactions";
import { InteractionControllerBase } from "./InteractionControllerBase";

export class CommandInteractionController extends InteractionControllerBase {
  private _name: String;

  constructor(raw: RawInteractionObject, client: InteractiveClient) {
    super(raw, client);
    this._name = raw.data.name || "";
  }

  get name(): String {
    return this._name;
  }
}