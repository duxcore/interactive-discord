import { ComponentObject, ComponentType, ComponentTypes } from "../util/types/components";

export class ComponentActionRow {
  public components: ComponentTypes[] = [];

  constructor(...components: ComponentTypes[]) {
    components.map(comp => this.components.push(comp));
  }

  addComponent(component: ComponentTypes): ComponentActionRow {
    this.components.push(component);
    return this;
  }

  compile(asString?: boolean): string | ComponentObject {
    const object: ComponentObject = {
      type: 1,
      components: this.components.map(comp => comp.compile(false)) as ComponentObject[]
    };

    if (!asString) return object;
    else return JSON.stringify(object);
  }
}