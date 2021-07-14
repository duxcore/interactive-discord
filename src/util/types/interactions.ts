import { MessageEmbed } from "discord.js";
import { ComponentObject, UniversalComponentType } from "./components";

export interface RawInteractionObject {
  version: number;
  type: InteractionType;
  token: string;
  message?: Message;
  member: Member;
  id: string;
  guild_id: string;
  data: Data;
  channel_id: string;
  application_id: string;
}

export interface Message {
  type: number;
  tts: boolean;
  timestamp: string;
  pinned: boolean;
  mentions?: (null)[] | null;
  mention_roles?: (null)[] | null;
  mention_everyone: boolean;
  id: string;
  flags: number;
  embeds?: (null)[] | null;
  edited_timestamp?: null;
  content: string;
  components?: (ComponentsEntity)[] | null;
  channel_id: string;
  author: AuthorOrUser;
  attachments?: (null)[] | null;
}
export interface AuthorOrUser {
  username: string;
  public_flags: number;
  id: string;
  discriminator: string;
  avatar: string;
}
export interface ComponentsEntity {
  type: number;
  components?: (ComponentsEntity1)[] | null;
}
export interface ComponentsEntity1 {
  type: number;
  label: string;
  style: number;
  custom_id: string;
}
export interface Member {
  user: User;
  roles?: (string)[] | null;
  premium_since?: null;
  permissions: string;
  pending: boolean;
  nick?: null;
  mute: boolean;
  joined_at: string;
  is_pending: boolean;
  deaf: boolean;
  avatar?: null;
}
export interface User {
  username: string;
  public_flags: number;
  id: string;
  discriminator: string;
  avatar: string;
}
export interface Data {
  options?: (OptionsEntity)[] | null;
  name?: string;
  id: string;
  custom_id?: string;
  component_type?: number;
  values?: string[] | null
}
export interface OptionsEntity {
  value: string;
  type: number;
  name: string;
  options?: OptionsEntity[]
}

export enum InteractionType {
  Ping = 1,
  ApplicationCommand = 2,
  MessageComponent = 3
}

export type AllowedMentionTypes =
  | "roles"
  | "users"
  | "everyone"

export enum MessageFlags {
  CROSSPOSTED = 1 << 0,
  IS_CROSSPOST = 1 << 1,
  SUPRESS_EMBEDS = 1 << 2,
  SOURCE_MESSAGE_DELETED = 1 << 3,
  URGENT = 1 << 4,
  HAS_THREAD = 1 << 5,
  EPHEMERAL = 1 << 6,
  LOADING = 1 << 7
}

export interface AllowedMentionsObj {
  parse: AllowedMentionTypes[]
  roles?: string[]
  users?: string[]
  replied_user: boolean
}

export enum InteractionResponseType {
  Pong = 1,
  ChannelMessageWithSource = 4,
  DeferredChannelMessageWithSource = 5,
  DeferredUpdateMessage = 6,
  UpdateMessage = 7
}

export interface InteractionResponseObject {
  type: number
  data: {
    tts?: boolean,
    content: string,
    embeds?: Array<MessageEmbed>,
    components?: ComponentObject[]
    allowed_mentions?: AllowedMentionsObj,
    flags?: MessageFlags
  }
}

export interface InteractionResponseOptions {
  tts?: boolean;
  type?: InteractionResponseType;
  content?: string,
  embeds?: MessageEmbed[],
  components?: UniversalComponentType,
  allowedMentions?: AllowedMentionsObj,
  isPrivate?: boolean;
  shouldEdit?: boolean
}