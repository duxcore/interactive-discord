import { ComponentObject, ComponentType } from "../util/types/components";
import { ButtonComponent } from "./buttons/ButtonComponent";
import { LinkButtonComponent } from "./buttons/LinkButtonComponent";
import { ComponentActionRow } from "./ComponentActionRow";

type GlobalComponentTypes = 
  | ComponentActionRow
  | ButtonComponent
  | LinkButtonComponent

export class ComponentCluster {
  public components: GlobalComponentTypes[] = []

  constructor(...components: GlobalComponentTypes[]) {
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