import { ButtonComponent, LinkButtonComponent, SelectionComponent } from "@duxcore/interactive-discord"

export const primarybutton = new ButtonComponent({
    style: 1,
    label: "Primary Button"
})
export const secondarybutton = new ButtonComponent({
    style: 2,
    label: "Secondary Button"
})
export const successbutton = new ButtonComponent({
    style: 3,
    label: "Success Button"
})
export const dangerbutton = new ButtonComponent({
    style: 4,
    label: "Danger Button"
})
export const replacebutton = new ButtonComponent({
    style: 4,
    label: "I will replace all other buttons"
})
export const killerbutton = new ButtonComponent({ style: 4, label: 'I replaced the others' });
export const reviverbutton = new ButtonComponent({ style: 3, label: 'Bring them back!' });
export const selectionbutton = new ButtonComponent({
    style: 1,
    label: "Show Selection Menu"
})
export const multiselectbutton = new ButtonComponent({
    style: 1,
    label: "Show Multi Select Menu"
})
export const linkbutton = new LinkButtonComponent('https://duxcore.co', {
    style: 1,
    label: 'Link Button'
})

export const basicselection = new SelectionComponent({
    placeholder: 'Basic Selection',
    options: [
        { label: 'Hi', description: 'This is hi', value: 'hi' },
        { label: 'Bye', description: 'This is bye', value: 'bye' }
    ]
})

export const multiselection = new SelectionComponent({
    placeholder: 'Multi Selection',
    min_values: 1,
    max_values: 3,
    options: [
        { label: 'I can be selected', description: 'multi select example', value: 'I can be selected' },
        { label: 'Even I can be selected', description: 'multi select example', value: 'Even I can be selected' },
        { label: 'Mee too', description: 'multi select example', value: 'Mee too' },
        { label: 'Mee too 2', description: 'multi select example', value: 'Mee too 2' },
    ]
})

