import uuid from 'uuid';
import { ButtonComponentOptions } from '../../util/types/button';
import { ButtonStyle, ComponentObject, ComponentType } from '../../util/types/components';
import { BaseButtonComponent } from './BaseButtonComponent';

export class LinkButtonComponent extends BaseButtonComponent{
  private _url: string;

  constructor(url: string, options: ButtonComponentOptions) {
    super(options);
    this._url = url;
  }

  get url(): string { return this._url}

  compile(asString?: boolean): ComponentObject | string {
    const compiledObject: ComponentObject = {
      type: ComponentType.Button,
      style: ButtonStyle.Link,
      label: this.label,
      url: this.url,
      disabled: this.disabled,
    }

    if (!asString) return compiledObject;
    else return JSON.stringify(compiledObject);
  }
}