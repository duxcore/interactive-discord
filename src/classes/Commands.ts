import axios from "axios";
import { Collection, Snowflake } from "discord.js";
import InteractiveClient from "..";
import { CommandController } from "../controllers/CommandController";
import { SlashCommand } from "../structures/SlashCommand";
import { discord } from "../util/constraints";
import registerCommand from "../util/registerCommand";
import { ApplicationCommand } from "../util/types/command";

export class Commands {
  private _client: InteractiveClient;
  private _commandCache = new Collection<string, CommandController>();
  private _axiosOpts: any;
  
  constructor(client: InteractiveClient) {
    this._client = client;
    this._axiosOpts = {headers: { "Authorization": `Bot ${this._client.bot.token}`}};
  }

  public async getAll(guild?: Snowflake): Promise<Collection<Snowflake, ApplicationCommand>> {
    const application = await this._client.bot.fetchApplication()
    const url = (!guild ? `${discord}/applications/${application.id}/commands` : `${discord}/applications/${application.id}/guild/${guild}/commands`);

    const newDat: ApplicationCommand[] = await axios.get(url, this._axiosOpts).then(dat => dat.data);
    const collection = new Collection<Snowflake, ApplicationCommand>();

    newDat.map(cmd => collection.set(cmd.id, cmd));

    return collection;
  }

  public async delete(id: Snowflake, guild?: Snowflake): Promise<void> {
    const application = await this._client.bot.fetchApplication()
    const url = (!guild ? `${discord}/applications/${application.id}/commands/${id}` : `${discord}/applications/${application.id}/guild/${guild}/commands/${id}`);

    await axios.delete(url, this._axiosOpts);

    return;
  }

  public async register(cmd: SlashCommand): Promise<CommandController> {
    let cachedCmd = this._commandCache.get(cmd.name);
    if (cachedCmd) return (await cachedCmd.update(cmd));

    const registeredData = await registerCommand(cmd, this._client);
    const controller = new CommandController(cmd, registeredData, this._client);

    this._commandCache.set(controller.command.name, controller);
    return controller;
  }
}