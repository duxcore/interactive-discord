import * as uuid from 'uuid';
import { SelectionComponentOption, SelectionComponentOptions } from '../../util/types/selection';

export class BaseSelectionComponent {
    private _placeholder?: string;
    private _options?: SelectionComponentOption[]
    private _customId: string;
    private _minValues?: number;
    private _maxValues?: number;

    constructor(componentOptions: SelectionComponentOptions) {
        this._placeholder = componentOptions.placeholder;
        this._customId = componentOptions.custom_id ?? uuid.v4();
        this._options = componentOptions.options;
        this._minValues = componentOptions.min_values;
        this._maxValues = componentOptions.max_values;
    }

    get placeholder(): string | undefined { return this._placeholder; }
    get options(): SelectionComponentOption[] | undefined { return this._options; }
    get min_values(): number | undefined { return this._minValues; }
    get max_values(): number | undefined { return this._maxValues; }
    get customId(): string { return this._customId; }

    setPlaceholder(placeholder: string): this {
        this._placeholder = placeholder;
        return this;
    }

    setOptions(options: SelectionComponentOption[]): this {
        this._options = options;
        return this;
    }

    setMinValues(min_values: number): this {
        this._minValues = min_values;
        return this;
    }

    setMaxValues(max_values: number): this {
        this._maxValues = max_values;
        return this;
    }


}