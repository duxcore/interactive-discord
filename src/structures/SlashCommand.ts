import { ApplicationCommandOption, NewCommandOptions } from "../util/types/command";

export class SlashCommands {
  private _name: string;
  private _description: string;

  private _options: ApplicationCommandOption[];
  private _defaultPermission: boolean;

  constructor(options: NewCommandOptions) {
    this._name = options.name;
    this._description = options.description;

    this._options = options.options ?? [];
    this._defaultPermission = options.default_permissions ?? true;
  }

  setName(name: string): this {
    this._name = name;
    return this;
  }

  setDescription(desc: string): this {
    this._description = desc;
    return this;
  }

  compile(): NewCommandOptions {
    const cmd: NewCommandOptions = {
      name: this._name,
      description: this._description,

      options: this._options,
      default_permissions: this._defaultPermission
    }

    return cmd;
  }

}