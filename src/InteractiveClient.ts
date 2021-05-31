import { Client, Collection } from "discord.js";
import { TypedEmitter } from 'tiny-typed-emitter';
import { ButtonInteractionController } from "./controllers/ButtonInteractionController";
import { ButtonComponent } from "./structures/buttons/ButtonComponent";
import { ButtonListenerCallback } from "./util/types/button";
import { Events } from "./util/types/events";
import { InteractionType, RawInteractionObject } from "./util/types/interactions";

export class InteractiveClient extends TypedEmitter<Events> {
  public bot: Client;
  public applicationId: string;

  private _buttonListeners = new Collection<string, ButtonListenerCallback>();
  private _singleButtonListeners = new Collection<string, ButtonListenerCallback>();

  constructor(bot: Client, applicationId: string) {
    super();

    // @ts-ignore
    bot.ws.on("INTERACTION_CREATE", (interaction: RawInteractionObject) => {
      if (interaction.type == InteractionType.MessageComponent) {
        const btnController = new ButtonInteractionController(interaction, this)
        this.emit("buttonInteraction", btnController);
        this._buttonListeners.map((cb, key) => {
          if (btnController.customId == key) return cb(btnController);
        });

        this._singleButtonListeners.map((cb, key) => {
          if (btnController.customId == key) {
            this._singleButtonListeners.delete(key);
            return cb(btnController);
          }
        });
      }
    })

    this.bot = bot;
    this.applicationId = applicationId;
  }

  addButtonListener(button: ButtonComponent, callback: ButtonListenerCallback) {
    this._buttonListeners.set(button.customId, callback);
  }

  addSingleButtonListener(button: ButtonComponent, callback: ButtonListenerCallback) {
    this._singleButtonListeners.set(button.customId, callback);
  }
}