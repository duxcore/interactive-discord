import { ButtonInteractionController } from "../../controllers/ButtonInteractionController";
import { InteractiveClient } from "../../InteractiveClient";
import { ButtonStyle, EmojiPartial } from "./components";

export interface ButtonComponentOptions {
  label?: string,
  style?: ButtonStyle,
  custom_id?: string,
  disabled?: boolean
  emoji?: EmojiPartial,
}


export type ButtonListenerCallback = (interaction: ButtonInteractionController) => void;