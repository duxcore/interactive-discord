import * as uuid from 'uuid';
import { ButtonComponentOptions } from "../../util/types/button";
import { ButtonStyle, EmojiPartial } from "../../util/types/components";

export class BaseButtonComponent {
  private _label?: string;
  private _style: ButtonStyle;
  private _customId: string;
  private _disabled: boolean;

  constructor(options: ButtonComponentOptions) {
    this._label = options.label;
    this._style = options.style ?? ButtonStyle.Secondary;
    this._customId = options.custom_id ?? uuid.v4();
    this._disabled = options.disabled ?? false;
  }

  get label(): string | undefined { return this._label; }
  get style(): ButtonStyle { return this._style; }
  get customId(): string { return this._customId; }
  get disabled(): boolean { return this._disabled }

  setLabel(label: string): this {
    this._label = label;
    return this;
  }

  setStyle(style: ButtonStyle): this {
    this._style = style;
    return this;
  }

  setDisabled(bool?: boolean): this {
    this._disabled = bool ?? false;
    return this;
  }
}