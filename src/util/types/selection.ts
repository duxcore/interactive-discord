import { SelectionInteractionController } from "../../controllers/SelectionInteractionController";

export interface SelectionComponentOptions {
    placeholder?: string,
    custom_id?: string,
    options?: SelectionComponentOption[],
    min_values?: number,
    max_values?: number
}

export interface SelectionComponentOption {
    label?: string,
    description?: string,
    value?: string
}

export type SelectionListenerCallback = (interaction: SelectionInteractionController) => void;