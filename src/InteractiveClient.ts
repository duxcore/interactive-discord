import { APIMessageContentResolvable, Client, Collection, DMChannel, MessageAdditions, MessageOptions, NewsChannel, TextChannel } from "discord.js";
import { TypedEmitter } from 'tiny-typed-emitter';
import { SelectionComponent } from ".";
import { Commands } from "./classes/Commands";
import { ButtonInteractionController } from "./controllers/ButtonInteractionController";
import { SelectionInteractionController } from "./controllers/SelectionInteractionController";
import { ButtonComponent } from "./structures/buttons/ButtonComponent";
import { getChannelPerms } from "./util/channel";
import compileComponents from "./util/compileComponents";
import { ButtonListenerCallback } from "./util/types/button";
import { SendComponentsOptions, UniversalComponentType } from "./util/types/components";
import { Events } from "./util/types/events";
import { InteractionType, RawInteractionObject } from "./util/types/interactions";
import { SelectionListenerCallback } from "./util/types/selection";

export class InteractiveClient extends TypedEmitter<Events> {
  public bot: Client;

  private _buttonListeners = new Collection<string, ButtonListenerCallback>();
  private _singleButtonListeners = new Collection<string, ButtonListenerCallback>();
  private _selectionListeners = new Collection<string, SelectionListenerCallback>();

  public commands: Commands;

  constructor(bot: Client) {
    super();

    this.bot = bot;
    this.commands = new Commands(this);

    // @ts-ignore
    bot.ws.on("INTERACTION_CREATE", (interaction: RawInteractionObject) => {
      if (interaction.type == InteractionType.MessageComponent) {
        const btnController = new ButtonInteractionController(interaction, this)
        const selController = new SelectionInteractionController(interaction, this)
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

        this._selectionListeners.map((cs, key) => {
          if (selController.customId == key) return cs(selController);
        });
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

  sendComponents({ channel, components, content, embed }: SendComponentsOptions) {

    const cluster = compileComponents(components);

    let senderOpts: APIMessageContentResolvable | MessageAdditions | MessageOptions = {
      content,
      components: cluster.compile() as string,
    }

    if (embed) senderOpts.embed = embed;

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
        newTextChannel.send(senderOpts);
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
        newNewsChannel.send(senderOpts)
        break;

      case "dm":
        const newDmChannel = new DMChannel(this.bot, {
          type: channel.type,
          recipients: [channel.recipient.toJSON()],
          last_message_id: channel.lastMessageID,
          id: channel.id
        })
        newDmChannel.send(senderOpts);
        break;

    }

  }
}
