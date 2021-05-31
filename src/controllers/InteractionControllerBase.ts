import { Guild, GuildMember } from "discord.js";
import { InteractiveClient } from "../InteractiveClient";
import { Message, RawInteractionObject } from "../util/types/interactions";

export class InteractionControllerBase {
  private _raw: RawInteractionObject;
  private _client: InteractiveClient;

  private _version: number;
  private _type: number;
  private _token: string;

  private _id: string;
  private _guildId: string;

  constructor(raw: RawInteractionObject, client: InteractiveClient) {
    this._raw = raw;
    this._client = client;

    this._version = raw.version;
    this._type = raw.type;
    this._token = raw.token;

    this._id = raw.id;
    this._guildId = raw.guild_id;
  }

  get raw(): RawInteractionObject { return this._raw; }

  get id(): string { return this._id; }
  get token(): string { return this._token; }

  get guild(): Guild | null {
    const guild = this._client.bot.guilds.cache.get(this._guildId);
    return guild ?? null;
  }

  get member(): GuildMember | null {
    const guild = this._client.bot.guilds.cache.get(this._guildId);
    const member = guild?.members.cache.get(this._raw.member.user.id);

    return member ?? null;
  }

  get message(): Message | null {
    const message = this._raw.message;
    return message ?? null;
  }

  reply() {}  

  respond() {}
}