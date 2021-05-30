import uuid from 'uuid';
import { ButtonComponentOptions } from "../../util/types/button";
import { ButtonStyle, ComponentObject, ComponentType, EmojiPartial } from "../../util/types/components";
import { BaseButtonComponent } from './BaseButtonComponent';

export class ButtonComponent extends BaseButtonComponent {
  constructor(options: ButtonComponentOptions) {
    super(options);
  }

  compile(asString?: boolean): ComponentObject | string {
    const compiledObject: ComponentObject = {
      type: ComponentType.Button,
      custom_id: this.customId,
      style: this.style,
      label: this.label,
      disabled: this.disabled,
    }

    if (!asString) return compiledObject;
    else return JSON.stringify(compiledObject);
  }

}