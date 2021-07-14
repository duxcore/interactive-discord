import InteractiveClient from "..";
import { OptionsEntity, RawInteractionObject } from "../util/types/interactions";
import { InteractionControllerBase } from "./InteractionControllerBase";

export class CommandInteractionController extends InteractionControllerBase {
  private _name: string;
  private _options?: OptionsEntity[] | null | undefined;

  constructor(raw: RawInteractionObject, client: InteractiveClient) {
    super(raw, client);

    this._name = raw.data.name || "";
    this._options = raw.data.options;
  }

  get name(): string {
    return this._name;
  }

  get options(): OptionsEntity[] | null | undefined {
    return this._options;
  }
}