import { Snowflake } from "discord.js";
import { ApplicationCommandOption, ApplicationCommandPermissions, SlashCommandOptions } from "../util/types/command";

export class SlashCommand {
  private _name: string;
  private _description: string;

  private _permissions?: ApplicationCommandPermissions[];
  private _options: ApplicationCommandOption[];
  private _defaultPermission: boolean;

  constructor(options: SlashCommandOptions) {
    this._name = options.name;
    this._description = options.description;

    this._permissions = options.permissions ?? undefined;
    this._options = options.options ?? [];
    this._defaultPermission = options.default_permissions ?? true;
  }

  get name(): string { return this._name; }
  get description(): string { return this._description; }

  get permissions(): ApplicationCommandPermissions[] { return this._permissions ?? []; }
  get options(): ApplicationCommandOption[] { return this._options; }
  get defaultPermission(): boolean { return this._defaultPermission; }

  compile(): SlashCommandOptions {
    const cmd: SlashCommandOptions = {
      name: this._name,
      description: this._description,

      options: this._options,
      permissions: this._permissions,
      default_permissions: this._defaultPermission
    }

    return cmd;
  }

}