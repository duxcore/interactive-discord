import { NewsChannel, TextChannel } from "discord.js";

export function getChannelPerms(channel: TextChannel | NewsChannel) {
    let overrides: Array<{ id: string, type: string, deny: number, allow: number }> = [];
    channel.permissionOverwrites.forEach((p) => {
        overrides.push({ id: p.id, type: p.type, deny: Number(p.deny), allow: Number(p.allow) })
    })
    return overrides;
}