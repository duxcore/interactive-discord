import { ButtonComponent, ButtonStyle, LinkButtonComponent, SelectionComponent } from "@duxcore/interactive-discord"

export const primarybutton = new ButtonComponent({
    style: ButtonStyle.Primary,
    label: "Primary Button"
})
export const secondarybutton = new ButtonComponent({
    style: ButtonStyle.Secondary,
    label: "Secondary Button"
})
export const successbutton = new ButtonComponent({
    style: ButtonStyle.Success,
    label: "Success Button"
})
export const dangerbutton = new ButtonComponent({
    style: ButtonStyle.Danger,
    label: "Danger Button"
})
export const replacebutton = new ButtonComponent({
    style: ButtonStyle.Danger,
    label: "I will replace all other buttons"
})

export const hibutton = new ButtonComponent({
    style: ButtonStyle.Primary,
    label: "Hi"
})

export const byebutton = new ButtonComponent({
    style: ButtonStyle.Primary,
    label: "Bye"
})

export const killerbutton = new ButtonComponent({ style: 4, label: 'I replaced the others' });
export const reviverbutton = new ButtonComponent({ style: 3, label: 'Bring them back!' });
export const selectionbutton = new ButtonComponent({
    style: ButtonStyle.Primary,
    label: "Show Selection Menu"
})
export const multiselectbutton = new ButtonComponent({
    style: ButtonStyle.Primary,
    label: "Show Multi Select Menu"
})
export const linkbutton = new LinkButtonComponent('https://duxcore.co', {
    style: ButtonStyle.Primary,
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

export const sademojibutton = new ButtonComponent({
    emoji: {
        name: 'ultrasadduxcore',
        id: '845821663395446794',
        animated: false
    },
    label: 'Sad',
    style: ButtonStyle.Primary
})

export const happyemojibutton = new ButtonComponent({
    emoji: {
        name: 'ultrahappyduxcore',
        id: '845821651240484864',
        animated: false
    },
    label: 'Happy',
    style: ButtonStyle.Primary
})

