import { Client, DMChannel, NewsChannel, TextChannel } from "discord.js";

export function getChannelPerms(channel: TextChannel | NewsChannel) {
    let overrides: Array<{ id: string, type: string, deny: number, allow: number }> = [];
    channel.permissionOverwrites.forEach((p) => {
        overrides.push({ id: p.id, type: p.type, deny: Number(p.deny), allow: Number(p.allow) })
    })
    return overrides;
}

export function getNewChannel(channel: TextChannel | DMChannel | NewsChannel, client: Client) {
    switch (channel.type) {
        case "text":
            const newTextChannel = new TextChannel(channel.guild, {
                type: channel.type,
                topic: channel.topic,
                rate_limit_per_user: channel.rateLimitPerUser,
                position: channel.position,
                permission_overwrites: getChannelPerms(channel),
                nsfw: channel.nsfw,
                name: channel.name,
                last_message_id: channel.lastMessageID,
                id: channel.id

            })
            return newTextChannel;

            break;

        case "news":
            const newNewsChannel = new NewsChannel(channel.guild, {
                type: channel.type,
                topic: channel.topic,
                rate_limit_per_user: 0,
                position: channel.position,
                permission_overwrites: getChannelPerms(channel),
                nsfw: channel.nsfw,
                name: channel.name,
                last_message_id: channel.lastMessageID,
                id: channel.id
            });
            return newNewsChannel;
            break;

        case "dm":
            const newDmChannel = new DMChannel(client, {
                type: channel.type,
                recipients: [channel.recipient.toJSON()],
                last_message_id: channel.lastMessageID,
                id: channel.id
            })
            return newDmChannel;
            break;

    }
}