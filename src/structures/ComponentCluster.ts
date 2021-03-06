import { SelectionComponent } from "./selections/SelectionComponent";
import { ComponentObject, ComponentType, ComponentTypes } from "../util/types/components";
import { ButtonComponent } from "./buttons/ButtonComponent";
import { LinkButtonComponent } from "./buttons/LinkButtonComponent";
import { ComponentActionRow } from "./ComponentActionRow";

export class ComponentCluster {
  public components: ComponentTypes[] = []

  constructor(...components: ComponentTypes[]) {
    components.map(comp => this.components.push(comp));
  }

  addComponent(...components: ComponentTypes[]) {
    components.map(comp => this.components.push(comp));
  }

  compile(asString?: boolean): ComponentObject[] | string {
    let components: ComponentObject[] = [];

    this.components.map(component => {
      if (component instanceof ComponentActionRow) components.push(component.compile(false) as ComponentObject);
      else components.push((new ComponentActionRow(component)).compile() as ComponentObject);
    });

    if (!asString) return components;
    else return JSON.stringify(components);
  }
}