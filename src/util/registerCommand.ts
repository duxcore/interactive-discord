import axios from "axios";
import InteractiveClient from "..";
import { SlashCommand } from "../structures/SlashCommand";
import { discord } from "./constraints";
import { ApplicationCommand } from "./types/command";

export default function registerCommand(cmd: SlashCommand, client: InteractiveClient): Promise<ApplicationCommand> {
  return new Promise(async (resolve, reject) => {
    const application = (await client.bot.fetchApplication());
    const appurl = `${discord.api_url}applications/${application.id}`
    const isGlobal = (!cmd.guilds || cmd.guilds.length == 0);
    
    if (isGlobal) {
      const url = `${appurl}/commands`;
      axios.post(url, cmd.compile(), {headers:{'Authorization':`Bot ${client.bot.token}`}}).then((dat) => {
        const data = dat.data;
        return resolve(data);
      }).catch(err => reject(err.response.data));
      return;
    }

    const guilds = (typeof cmd.guilds == "string" ? [ cmd.guilds ] : cmd.guilds);

    guilds?.forEach(id => {
      const url = `${appurl}/guild/${id}/commands`;
      axios.post(url, cmd.compile(), {headers:{'Authorization':`Bot ${client.bot.token}`}}).then((dat) => {
        const data = dat.data;
        return resolve(data);
      }).catch(err => reject(err.response.data));
      return;
    })
  });
}