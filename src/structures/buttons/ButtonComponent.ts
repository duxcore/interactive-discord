import uuid from 'uuid';
import { ButtonComponentOptions } from "../../util/types/button";
import { ButtonStyle, ComponentObject, ComponentType, EmojiPartial } from "../../util/types/components";
import { BaseButtonComponent } from './BaseButtonComponent';

export class ButtonComponent extends BaseButtonComponent {
  private _emoji?: EmojiPartial;

  constructor(options: ButtonComponentOptions) {
    super(options);
    this._emoji = options.emoji ?? undefined;
  }

  get emoji(): EmojiPartial | undefined { return this._emoji }

  compile(asString?: boolean): ComponentObject | string {
    const compiledObject: ComponentObject = {
      type: 2,
      custom_id: this.customId,
      style: this.style,
      label: this.label,
      disabled: this.disabled,
      emoji: this.emoji
    }

    if (!asString) return compiledObject;
    else return JSON.stringify(compiledObject);
  }

}