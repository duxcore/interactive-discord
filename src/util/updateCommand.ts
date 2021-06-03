import axios from "axios";
import { Snowflake } from "discord.js";
import InteractiveClient from "..";
import { SlashCommand } from "../structures/SlashCommand";
import { discord } from "./constraints";
import { ApplicationCommand } from "./types/command";

export interface UpdateCommandOptions {
  commandId: Snowflake,
  command: SlashCommand,
  guilds?: Snowflake[] | Snowflake
}

export default function updateCommand({command, commandId, guilds}: UpdateCommandOptions, client: InteractiveClient): Promise<ApplicationCommand> {
  return new Promise(async (resolve, reject) => {
    const application = (await client.bot.fetchApplication());
    const appurl = `${discord.api_url}/applications/${application.id}`
    const axiosData: any = { headers: { 'Authorization': `Bot ${client.bot.token}` } };

    const isGlobal = !guilds;

    if (isGlobal) {
      const url = `${appurl}/commands/${commandId}`;
      axios.patch(url, command.compile(), { headers: { 'Authorization': `Bot ${client.bot.token}` } }).then((dat) => {
        const data = dat.data;
        return resolve(data);
      }).catch(err => reject(err.response.data ?? err.message));
      return;
    }

    guilds = (typeof guilds == 'string' ? [ guilds ] : guilds);

    guilds?.map(guildId => {
      const url = `${appurl}/guilds/${guildId}/commands/${commandId}`;
      axios.patch(url, command.compile(), axiosData).then((dat) => {
        const data = dat.data;
        return resolve(data);
      }).catch(err => reject(err.response.data ?? err.message));
    });
    return;
  });
}