import { Client } from "discord.js";
import { TypedEmitter } from 'tiny-typed-emitter';
import { ButtonInteractionController } from "./controllers/ButtonInteractionController";
import { Events } from "./util/types/events";
import { InteractionType, RawInteractionObject } from "./util/types/interactions";

export class InteractiveClient extends TypedEmitter<Events> {
  public bot: Client;
  public applicationId: string;

  constructor(bot: Client, applicationId: string) {
    super();

    // @ts-ignore
    bot.ws.on("INTERACTION_CREATE", (interaction: RawInteractionObject) => {
      if (interaction.type == InteractionType.MessageComponent) this.emit("buttonInteraction", new ButtonInteractionController(interaction, this));
    })

    this.bot = bot;
    this.applicationId = applicationId;
  }
}