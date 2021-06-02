import { ButtonInteractionController } from "../../controllers/ButtonInteractionController";
import { CommandInteractionController } from "../../controllers/CommandInteractionController";
import { SelectionInteractionController } from "../../controllers/SelectionInteractionController";

export interface Events {
  "buttonInteraction": (interaction: ButtonInteractionController) => void;
  "selectionInteraction": (interaction: SelectionInteractionController) => void;
  "commandInteraction": (interaction: CommandInteractionController) => void;
}