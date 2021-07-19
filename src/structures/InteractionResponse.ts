import { MessageEmbed } from "discord.js";
import { ComponentObject, ComponentTypes, UniversalComponentType } from "../util/types/components";
import { AllowedMentionsObj, InteractionResponseObject, InteractionResponseOptions, InteractionResponseType, MessageFlags } from "../util/types/interactions";
import { ComponentCluster } from "./ComponentCluster";

export class InteractionResponse {
  private _useTTS: boolean;
  private _private: boolean;
  private _defer: 'components' | 'message' | 'none';
  private _edit: boolean;
  private _type: InteractionResponseType;

  private _content: string;
  private _embeds: MessageEmbed[]
  private _components: UniversalComponentType | null;
  private _allowedMentions: AllowedMentionsObj | null;

  constructor(options: InteractionResponseOptions) {
    this._useTTS = options.tts ?? false;
    this._private = options.isPrivate ?? false;
    this._defer = options.defer ?? 'none';
    this._edit = options.shouldEdit ?? false;
    this._type = options.type ?? InteractionResponseType.ChannelMessageWithSource;

    this._content = options.content ?? "";
    this._embeds = options.embeds ?? [];
    this._components = options.components ?? null;
    this._allowedMentions = options.allowedMentions ?? null;
  }

  get useTTS(): boolean { return this._useTTS; }
  get isPrivate(): boolean { return this._private; }
  get isDeferred(): 'components' | 'message' | 'none' { return this._defer; }
  get isEdit(): boolean { return this._edit; }

  get content(): string { return this._content; }
  get embeds(): MessageEmbed[] { return this._embeds; }
  get components(): UniversalComponentType | null { return this._components; }
  get allowedMentions(): AllowedMentionsObj | null { return this._allowedMentions; }

  setContent(content: string): this {
    this._content = content;
    return this;
  }

  setEmbeds(...embeds: MessageEmbed[]): this {
    this._embeds = embeds
    return this;
  }

  setComponents(components: UniversalComponentType): this {
    this._components = components;
    return this;
  }

  compile(): InteractionResponseObject {
    let responseObject: InteractionResponseObject = {
      type: this._edit ? InteractionResponseType.UpdateMessage : (this._type ?? 4),
      data: {
        content: this._content,
        tts: this._useTTS,
        embeds: this._embeds,
      }
    }

    if (this._private) responseObject.data.flags = MessageFlags.EPHEMERAL;
    if (this._defer == 'message') responseObject.type = InteractionResponseType.DeferredChannelMessageWithSource;
    if (this._defer == 'components') responseObject.type = InteractionResponseType.DeferredUpdateMessage;
    if (this._allowedMentions) responseObject.data.allowed_mentions = this._allowedMentions;
    if (this._components) {
      const compileComponents = ((): ComponentCluster => {
        if (this._components instanceof ComponentCluster) return this._components;
        if (!(this._components instanceof Array)) return new ComponentCluster(this._components);
        const cluster = new ComponentCluster(...this._components);

        return cluster
      })();

      responseObject.data.components = compileComponents.compile(false) as ComponentObject[];
    }

    return responseObject;
  }
}