import uuid from 'uuid';
import { ButtonComponentOptions } from "../util/types/button";
import { ButtonStyle, EmojiPartial } from "../util/types/components";

export class ButtonComponent {
  private _label?: string;
  private _style?: ButtonStyle;
  private _customId: string;
  private _disabled: boolean;

  constructor(options: ButtonComponentOptions) {
    this._label = options.label;
    this._style = options.style ?? ButtonStyle.Secondary;
    this._customId = options.custom_id ?? uuid.v4();
    this._disabled = options.disabled ?? false;
  }

  setLabel(label: string): ButtonComponent {
    this._label = label;
    return this;
  }

}