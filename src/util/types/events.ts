import { ButtonInteractionController } from "../../controllers/ButtonInteractionController";

export interface Events {
  "buttonInteraction": (interaction: ButtonInteractionController) => void;
}