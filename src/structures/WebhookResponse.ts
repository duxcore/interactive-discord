import { MessageAttachment, MessageEmbed } from "discord.js";
import { ComponentObject, UniversalComponentType } from "../util/types/components";
import { AllowedMentionsObj, WebhookResponseObject, WebhookResponseOptions } from "../util/types/interactions";
import { ComponentCluster } from "./ComponentCluster";

export class WebhookResponse {
    private _content: string;
    private _embeds: MessageEmbed[]
    private _file: File | null;
    private _payloadJson: string;
    private _allowedMentions: AllowedMentionsObj | null;
    private _attachments: MessageAttachment[];
    private _components: UniversalComponentType;

    constructor(options: WebhookResponseOptions) {
        this._content = options.content ?? "";
        this._embeds = options.embeds ?? [];
        this._file = options.file ?? null;
        this._payloadJson = options.payload_json ?? "";
        this._allowedMentions = options.allowed_mentions ?? null;
        this._attachments = options.attachments ?? [];
        this._components = options.components ?? [];
    }


    get content(): string { return this._content; }
    get embeds(): MessageEmbed[] { return this._embeds; }
    get file(): File | null { return this._file; }
    get payloadJson(): string { return this._payloadJson; }
    get allowedMentions(): AllowedMentionsObj | null { return this._allowedMentions; }
    get attachments(): MessageAttachment[] { return this._attachments; }
    get components(): UniversalComponentType { return this._components; }

    setContent(content: string): this {
        this._content = content;
        return this;
    }

    setEmbeds(...embeds: MessageEmbed[]): this {
        this._embeds = embeds
        return this;
    }

    setFile(file: File): this {
        this._file = file;
        return this;
    }

    setPayloadJson(payloadJson: string): this {
        this._payloadJson = payloadJson;
        return this;
    }

    setattachments(attachments: MessageAttachment[]): this {
        this._attachments = attachments;
        return this;
    }


    setComponents(components: UniversalComponentType): this {
        this._components = components;
        return this;
    }

    compile(): WebhookResponseObject {
        let responseObject: WebhookResponseObject = {
            content: this._content,
            embeds: this._embeds,
            payload_json: this._payloadJson,
            attachments: this._attachments,
        }

        if (this._file) responseObject.file = this._file;
        if (this._allowedMentions) responseObject.allowed_mentions = this._allowedMentions;
        if (this._components) {
            const compileComponents = ((): ComponentCluster => {
                if (this._components instanceof ComponentCluster) return this._components;
                if (!(this._components instanceof Array)) return new ComponentCluster(this._components);
                const cluster = new ComponentCluster(...this._components);

                return cluster
            })();

            responseObject.components = compileComponents.compile(false) as ComponentObject[];
        }

        return responseObject;
    }
}