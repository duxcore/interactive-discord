/**
 * MESSAGE COMPONENTS
 */

import { DMChannel, MessageEmbed, NewsChannel, TextChannel } from "discord.js";
import { ButtonComponent } from "../../structures/buttons/ButtonComponent";
import { LinkButtonComponent } from "../../structures/buttons/LinkButtonComponent";
import { ComponentActionRow } from "../../structures/ComponentActionRow";
import { ComponentCluster } from "../../structures/ComponentCluster";
import { SelectionComponent } from "../../structures/selections/SelectionComponent";
import { SelectionComponentOption } from "./selection";

export type ComponentTypes =
  | ButtonComponent
  | LinkButtonComponent
  | ComponentActionRow
  | SelectionComponent

export enum ComponentType {
  ActionRow = 1,
  Button = 2
}

export enum ButtonStyle {
  Primary = 1, // Blurple
  Secondary = 2, // Grey
  Success = 3, // Green
  Danger = 4, // Red
  Link = 5 // Grey, navigates to url
}

export interface EmojiPartial {
  name: string,
  id: string,
  animated: boolean
}

export interface ComponentObject {
  type: ComponentType, // What type of component is it?
  components?: ComponentObject[] // Action Row Buttons (only for action row!!!)

  /** Button Only */
  style?: ButtonStyle, // The style of the button component.
  label?: string, // The text that appears on the button (max 80 characters) 
  emoji?: EmojiPartial,  // The emoji to appear next to the button if you want one.
  custom_id?: string, // A developer-defined identifier for the button (max 100 characters)
  url?: string, // A URL For link-style buttons
  disabled?: boolean // Is the button disabled? 

  /** Selections Only */
  placeholder?: string,
  options?: SelectionComponentOption[],
  min_values?: number,
  max_values?: number
}

export type UniversalComponentType =
  | ComponentTypes
  | ComponentCluster
  | Array<ComponentTypes>

export interface SendComponentsOptions {
  content: string;
  embeds?: MessageEmbed[];
  components: UniversalComponentType;
  channel: TextChannel | DMChannel | NewsChannel
}