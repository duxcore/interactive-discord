import { Client } from "discord.js";

export class InteractiveClient {
  public bot: Client;

  constructor(bot: Client) {
    this.bot = bot;
  }
}