import uuid from 'uuid';
import { ComponentObject } from "../../util/types/components";
import { SelectionComponentOptions } from '../../util/types/selection';
import { BaseSelectionComponent } from './BaseSelectionComponent';

export class SelectionComponent extends BaseSelectionComponent {
    constructor(options: SelectionComponentOptions) {
        super(options);
    }

    compile(asString?: boolean): ComponentObject | string {
        const compiledObject: ComponentObject = {
            type: 3,
            custom_id: this.customId,
            placeholder: this.placeholder,
            options: this.options,
            min_values: this.min_values,
            max_values: this.max_values,
        }

        if (!asString) return compiledObject;
        else return JSON.stringify(compiledObject);
    }

}