import axios from "axios";
import InteractiveClient from "..";
import { discord } from "../util/constraints";
import updateCommand from "../util/updateCommand";
import { Collection, Snowflake } from "discord.js";
import registerCommand from "../util/registerCommand";``
import { SlashCommand } from "../structures/SlashCommand";
import { ApplicationCommand } from "../util/types/command";
import { testCommandUnchanged } from "../util/testCommandUnchanged";

type CommandCollection = Collection<Snowflake, ApplicationCommand>;
type Guilds = Snowflake | Snowflake[]

export class Commands {
  private _client: InteractiveClient;
  private _internalCommandCache = new Collection<Snowflake | "global", CommandCollection>()
  
  constructor(client: InteractiveClient) {
    this._client = client;
  }

  public async getAll(guild?: Snowflake): Promise<CommandCollection> {
    const opts = { headers: { "Authorization": `Bot ${this._client.bot.token}` } };
    const application = await this._client.bot.fetchApplication()
    const url = (!guild ? `${discord.api_url}/applications/${application.id}/commands` : `${discord.api_url}/applications/${application.id}/guilds/${guild}/commands`);

    const newDat: ApplicationCommand[] = await axios.get(url, opts).then(dat => dat.data);
    const collection = new Collection<Snowflake, ApplicationCommand>();

    newDat.map(cmd => collection.set(cmd.id, cmd));

    return collection;
  }

  public async delete(id: Snowflake, guilds?: Snowflake): Promise<void> {
    const opts = { headers: { "Authorization": `Bot ${this._client.bot.token}` } };
    const application = await this._client.bot.fetchApplication();

    if (!guilds) {
      const url = `${discord.api_url}/applications/${application.id}/commands/${id}`;
      await axios.delete(url, opts);
      return;
    }
    
    const guildUrl = (gid: Snowflake) => `${discord.api_url}/applications/${application.id}/guilds/${gid}/commands/${id}`;
    const gs = (typeof guilds == 'string' ? [ guilds ] : guilds);
    gs.map(async gid => {
      await axios.delete(guildUrl(gid), opts);
      return;
    });
    return;
  }

  public async bulkDelete(ids: Snowflake[], guilds?: Snowflake): Promise<void> {
    const opts = { headers: { "Authorization": `Bot ${this._client.bot.token}` } };
    const application = await this._client.bot.fetchApplication();
    ids.forEach(async id => {
      if (!guilds) {
        const url = `${discord.api_url}/applications/${application.id}/commands/${id}`;
        await axios.delete(url, opts);
        return;
      }
      
      const guildUrl = (gid: Snowflake) => `${discord.api_url}/applications/${application.id}/guilds/${gid}/commands/${id}`;
      const gs = (typeof guilds == 'string' ? [ guilds ] : guilds);
      gs.map(async gid => {
        await axios.delete(guildUrl(gid), opts);
        return;
      });
      return;
    });

  }

  public async register(command: SlashCommand, guilds?: Guilds): Promise<void> {
    if (!guilds && !this._internalCommandCache.has('global')) this._internalCommandCache.set('global', await this.getAll());
    if (guilds !== undefined) {
      const gs = (typeof guilds == 'string' ? [ guilds ] : guilds);
      gs.map(async id => { if (!this._internalCommandCache.has(id)) return this._internalCommandCache.set(id, await this.getAll(id))})
    }

    if (!guilds) {
      const global = this._internalCommandCache.get("global");
      const getCommand = global?.find(cmd => cmd.name == command.name) ?? null;

      if (!getCommand) {
        await registerCommand({command}, this._client);
        return;
      }
        if (await testCommandUnchanged(command, getCommand)) return;
        await updateCommand({command, commandId: getCommand.id}, this._client);
      return;
    } 
    
    const gs = (typeof guilds == 'string' ? [ guilds ] : guilds);
    gs.map(async gid => {
      const guild = this._internalCommandCache.get(gid);
      const getCommand = guild?.find(cmd => cmd.name == command.name) ?? null;

      if (!getCommand) {
        await registerCommand({command, guilds: [ gid ]}, this._client);
        return;
      }
      if (await testCommandUnchanged(command, getCommand)) return;
        await updateCommand({command, commandId: getCommand.id, guilds: [ gid ]}, this._client);
      return;
    });
  }

  public async bulkRegister(commands: SlashCommand[], guilds?: Guilds): Promise<void> {
    if (!guilds && !this._internalCommandCache.has('global')) this._internalCommandCache.set('global', await this.getAll());
    if (guilds !== undefined) {
      const gs = (typeof guilds == 'string' ? [ guilds ] : guilds);
      gs.map(async id => { if (!this._internalCommandCache.has(id)) return this._internalCommandCache.set(id, await this.getAll(id))})
    }

    if (!guilds) {
      const global = this._internalCommandCache.get("global");
      commands.map(async command => {
        const getCommand = global?.find(cmd => cmd.name == command.name) ?? null;
  
        if (!getCommand) {
          await registerCommand({command}, this._client);
          return;
        }
        if (await testCommandUnchanged(command, getCommand)) return;
        await updateCommand({command, commandId: getCommand.id}, this._client);
        return;
      });
      return;
    } 
    
    const gs = (typeof guilds == 'string' ? [ guilds ] : guilds);
    gs.map(async gid => {
      const guild = this._internalCommandCache.get(gid);
      commands.map(async command => {
        const getCommand = guild?.find(cmd => cmd.name == command.name) ?? null;
  
        if (!getCommand) {
          await registerCommand({command, guilds: [ gid ]}, this._client);
          return;
        }
        if (await testCommandUnchanged(command, getCommand)) return;
          await updateCommand({command, commandId: getCommand.id, guilds: [ gid ]}, this._client);
        return;
      });
    });
    return;
  }
}