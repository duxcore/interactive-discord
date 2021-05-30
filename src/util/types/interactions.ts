import { MessageEmbed } from "discord.js";
import { ComponentObject } from "./components";

export interface RawInteractionObject {
  version: number;
  type: number;
  token: string;
  member: Member;
  id: string;
  guild_id: string;
  data: Data;
  channel_id: string;
  application_id: string;
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
  name: string;
  id: string;
}
export interface OptionsEntity {
  value: string;
  type: number;
  name: string;
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

export enum InteractionCBType {
  Pong = 1,
  ChannelMessageWithSource = 4,
  DeferredChannelMessageWithSource = 5,
  DeferredUpdateMessage = 6,
  UpdateMessage = 7
}

export interface InteractionResponse {
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