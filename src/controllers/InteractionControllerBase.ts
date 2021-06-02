import axios from 'axios';
import { Guild, GuildMember, MessageEmbed } from "discord.js";
import { InteractiveClient } from "../InteractiveClient";
import { InteractionResponse } from "../structures/InteractionResponse";
import { discord } from '../util/constraints';
import { InteractionResponseOptions, InteractionResponseType, Message, RawInteractionObject } from "../util/types/interactions";

export class InteractionControllerBase {
  private _raw: RawInteractionObject;
  private _client: InteractiveClient;

  private _version: number;
  private _type: number;
  private _token: string;

  private _id: string;
  private _guildId: string;
  private _isHandled: boolean;

  constructor(raw: RawInteractionObject, client: InteractiveClient) {
    this._raw = raw;
    this._client = client;

    this._version = raw.version;
    this._type = raw.type;
    this._token = raw.token;

    this._id = raw.id;
    this._guildId = raw.guild_id;
    this._isHandled = raw.is_handled;
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

  get isHandled(): boolean { return this._isHandled }

  setisHandled(is_handled: boolean): this {
    this._isHandled = is_handled
    return this;
  }

  respond(response: InteractionResponseOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      const responseObject = new InteractionResponse(response);
      axios.post(`${discord.api_url}interactions/${this.id}/${this.token}/callback`, responseObject.compile())
        .then(dat => {
          resolve()
        })
        .catch(dat => reject({
          message: "An error has occured whilst trying to send a response...",
          errors: dat.response.data.errors
        }));
    })
  }
}