import { Snowflake } from "discord.js";
import { CommandInteractionController } from "../../controllers/CommandInteractionController";

export enum ApplicationCommandOptionType {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP = 2,
  STRING = 3,
  INTEGER = 4,
  BOOLEAN = 5,
  USER = 6,
  CHANNEL = 7,
  ROLE = 8,
  MENTIONABLE = 9
}

export enum ApplicationCommandPermissionType {
  ROLE = 1,
  USER = 2
}

export interface SlashCommandOptions {
  name: string;
  description: string;
  guilds?: Snowflake | Snowflake[];
  permissions?: ApplicationCommandPermissions[];
  options?: ApplicationCommandOption[];
  default_permissions?: boolean;
}

export interface ApplicationCommand {
  id: Snowflake; // Unique ID of the command
  application_id: Snowflake; // Unique ID of the parent application
  name: string; // Name of the command
  description: string; // Description of the command
  options?: ApplicationCommandOption[]; // Options for an Application Command
  default_permission?: boolean;  // default as true
}

export interface ApplicationCommandOption {
  type: ApplicationCommandOptionType; // Command option type
  name: string; // Command Option name
  description: string; // Command Option Description
  required?: boolean; // Is the command option require?
  choices?: ApplicationCommandOptionChoice[]; // Choices for this command option?
  options?: ApplicationCommandOption[]; // Sub-options for this command option?
}

export interface ApplicationCommandOptionChoice {
  name: string; // The name of the option
  value: string | number; // The value of the coice (max 100 chars)
}

export interface GuildApplicationCommandPermissions {
  id: Snowflake; // The ID of the command.
  application_id: Snowflake // The ID of the application.
  guild_id: Snowflake // The ID of the guild.
  permissions: ApplicationCommandPermissions[]; // The permissions for the command in the guild.
}

export interface ApplicationCommandPermissions {
  id: Snowflake; // The ID of the role or user.
  type: ApplicationCommandPermissionType; // Role Or User
  permission: boolean // Is this user/role allowed?
}

export type ApplicationCommandEventCallback = (interaction: CommandInteractionController) => void;