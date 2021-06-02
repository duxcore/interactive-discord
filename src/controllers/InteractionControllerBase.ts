import axios from 'axios';
import { Channel, DMChannel, Guild, GuildMember, MessageEmbed, NewsChannel, TextChannel } from "discord.js";
import { InteractiveClient } from "../InteractiveClient";
import { InteractionResponse } from "../structures/InteractionResponse";
import { discord } from '../util/constraints';
import { InteractionResponseOptions, InteractionResponseType, Message, RawInteractionObject } from "../util/types/interactions";

export class InteractionControllerBase {
  public client: InteractiveClient;
  private _raw: RawInteractionObject;

  private _version: number;
  private _type: number;
  private _token: string;

  private _id: string;
  private _guildId: string;
  private _channelId: string;
  private _isHandled: boolean;

  constructor(raw: RawInteractionObject, client: InteractiveClient) {
    this._raw = raw;
    this.client = client;

    this._version = raw.version;
    this._type = raw.type;
    this._token = raw.token;

    this._id = raw.id;
    this._guildId = raw.guild_id;
    this._channelId = raw.channel_id;
    this._isHandled = false;
  }

  get raw(): RawInteractionObject { return this._raw; }

  get id(): string { return this._id; }
  get token(): string { return this._token; }

  get guild(): Guild {
    const guild = this.client.bot.guilds.cache.get(this._guildId) as Guild;
    return guild;
  }

  get channel(): TextChannel | DMChannel | NewsChannel {
    const channel = this.client.bot.channels.cache.get(this._channelId) as DMChannel | TextChannel | NewsChannel;
    return channel;
  }

  get member(): GuildMember | null {
    const guild = this.client.bot.guilds.cache.get(this._guildId);
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
      axios.post(`${discord.api_url}/interactions/${this.id}/${this.token}/callback`, responseObject.compile())
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