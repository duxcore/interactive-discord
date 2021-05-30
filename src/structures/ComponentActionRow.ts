import { Collection } from "discord.js";
import { ComponentTypes } from "../util/types/components";

export class ComponentActionRow {
  public components: ComponentTypes[] = [];

  constructor(...components: ComponentTypes[]) {
    components.map(comp => components.push(comp));
  }

  addComponent(component: ComponentTypes): ComponentActionRow {
    this.components.push(component);
    return this;
  }
}