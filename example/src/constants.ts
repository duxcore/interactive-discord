import { ButtonComponent, LinkButtonComponent } from "@duxcore/interactive-discord"

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

export const linkbutton = new LinkButtonComponent('https://duxcore.co', {
    style: 1,
    label: 'Link Button'
})