import { TextChannel, DMChannel, NewsChannel } from "discord.js";

export interface FetchMessageOptions {
    channel: TextChannel | DMChannel | NewsChannel;
    messageId: string
}