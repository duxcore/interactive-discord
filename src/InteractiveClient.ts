import { SelectionComponent } from ".";
import { TypedEmitter } from 'tiny-typed-emitter';
import { Events } from "./util/types/events";
import { Commands } from "./classes/Commands";
import { getChannelPerms, getNewChannel } from "./util/channel";
import { SlashCommand } from "./structures/SlashCommand";
import compileComponents from "./util/compileComponents";
import { ButtonListenerCallback } from "./util/types/button";
import { SendComponentsOptions } from "./util/types/components";
import { SelectionListenerCallback } from "./util/types/selection";
import { ButtonComponent } from "./structures/buttons/ButtonComponent";
import { ApplicationCommandEventCallback } from "./util/types/command";
import { InteractionType, RawInteractionObject } from "./util/types/interactions";
import { ButtonInteractionController } from "./controllers/ButtonInteractionController";
import { CommandInteractionController } from "./controllers/CommandInteractionController";
import { SelectionInteractionController } from "./controllers/SelectionInteractionController";
import { APIMessageContentResolvable, Client, Collection, Message, MessageAdditions, MessageOptions, } from "discord.js";
import { FetchMessageOptions } from "./util/types/other";

export class InteractiveClient extends TypedEmitter<Events> {
  public bot: Client;

  private _buttonListeners = new Collection<string, ButtonListenerCallback>();
  private _singleButtonListeners = new Collection<string, ButtonListenerCallback>();
  private _selectionListeners = new Collection<string, SelectionListenerCallback>();
  private _commandListeners = new Collection<string, ApplicationCommandEventCallback>();

  public commands: Commands;

  constructor(bot: Client) {
    super();

    this.bot = bot;
    this.commands = new Commands(this);

    // @ts-ignore
    bot.ws.on("INTERACTION_CREATE", (interaction: RawInteractionObject) => {
      if (interaction.type == InteractionType.MessageComponent) {

        if (interaction.data.values) {
          const selController = new SelectionInteractionController(interaction, this)

          this._selectionListeners.map((cs, key) => {
            if (selController.customId == key) {
              selController.setisHandled(true);
              return cs(selController)
            };
          });

          this.emit("selectionInteraction", selController);
        } else {
          const btnController = new ButtonInteractionController(interaction, this)

          this._buttonListeners.map((cb, key) => {
            if (btnController.customId == key) {
              btnController.setisHandled(true);
              return cb(btnController)
            };
          });

          this._singleButtonListeners.map((cb, key) => {
            if (btnController.customId == key) {
              btnController.setisHandled(true);
              this._singleButtonListeners.delete(key);
              return cb(btnController);
            }
          });

          this.emit("buttonInteraction", btnController);
        }
      }
      if (interaction.type == InteractionType.ApplicationCommand) {
        const cmdInteraction = new CommandInteractionController(interaction, this);

        this._commandListeners.map((cb, key) => {
          if (interaction.data.name == key) return cb(cmdInteraction)
        })

        this.emit("commandInteraction", cmdInteraction)
      }
    })
  }

  addButtonListener(button: ButtonComponent, callback: ButtonListenerCallback) {
    this._buttonListeners.set(button.customId, callback);
  }

  addSingleButtonListener(button: ButtonComponent, callback: ButtonListenerCallback) {
    this._singleButtonListeners.set(button.customId, callback);
  }

  addSelectionListener(selection: SelectionComponent, callback: SelectionListenerCallback) {
    this._selectionListeners.set(selection.customId, callback);
  }

  addCommandListener(cmd: SlashCommand, callback: ApplicationCommandEventCallback) {
    this._commandListeners.set(cmd.name, callback);
  }

  sendComponents({ channel, components, content, embeds }: SendComponentsOptions) {

    const cluster = compileComponents(components);

    let senderOpts: APIMessageContentResolvable | MessageAdditions | MessageOptions = {
      content,
      components: cluster.compile() as string,
    }

    if (embeds) senderOpts.embed = embeds;

    const newChannel = getNewChannel(channel, this.bot);
    newChannel.send(senderOpts);
  }

  async fetchMessage({ channel, messageId }: FetchMessageOptions): Promise<Message> {
    const newChannel = getNewChannel(channel, this.bot);
    return await newChannel.messages.fetch(messageId);
  }
}
