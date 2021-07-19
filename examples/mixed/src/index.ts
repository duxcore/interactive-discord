import Discord, { MessageEmbed } from 'discord.js';
import { config } from 'dotenv';
import InteractiveClient, { ComponentActionRow, ComponentCluster, SlashCommand } from '@duxcore/interactive-discord';
import { dangerbutton, killerbutton, linkbutton, primarybutton, replacebutton, reviverbutton, secondarybutton, selectionbutton, successbutton, basicselection, multiselection, multiselectbutton, hibutton, byebutton, happyemojibutton, sademojibutton } from './constants';

config();

const bot = new Discord.Client();

const interactiveClient = new InteractiveClient(bot)

const myGuildId = '844279877503025182';


bot.once('ready', () => {
    console.log('Bot online')

    const buttons = new SlashCommand({ name: 'buttons', description: 'Sends various button components' })
    interactiveClient.commands.register(buttons, myGuildId)

    const editableButtons = new SlashCommand({ name: 'editable-buttons', description: 'Sends various button components that edit the orignal message' })
    interactiveClient.commands.register(editableButtons, myGuildId)

    const selection = new SlashCommand({ name: 'selection', description: 'Sends basic selection component' })
    interactiveClient.commands.register(selection, myGuildId)

    const multiSelect = new SlashCommand({ name: 'multi-select', description: 'Sends multi select component' })
    interactiveClient.commands.register(multiSelect, myGuildId)

    const embed = new SlashCommand({ name: 'embed', description: 'Sends embed with button components' })
    interactiveClient.commands.register(embed, myGuildId)

    const emoji = new SlashCommand({ name: 'emoji', description: 'Sends button components with emoji content' })
    interactiveClient.commands.register(emoji, myGuildId)

    const defer_message = new SlashCommand({ name: 'defer-message', description: 'Sends a deferred interaction response' })
    interactiveClient.commands.register(defer_message, myGuildId)

    const defer_components = new SlashCommand({ name: 'defer-components', description: 'Sends a deferred component interaction response' })
    interactiveClient.commands.register(defer_components, myGuildId)
})

interactiveClient.on("commandInteraction", (interaction) => {
    if (!interaction.isHandled) {
        switch (interaction.raw.data.name) {
            case "buttons":

                const buttonCluster = new ComponentCluster(primarybutton, secondarybutton, successbutton, dangerbutton, linkbutton)

                interaction.respond({
                    components: buttonCluster,
                    content: 'Buttons'
                })

                interactiveClient.addButtonListener(primarybutton, (interaction) => {
                    interaction.respond({ content: 'Primary Button Clicked', isPrivate: true })
                })
                interactiveClient.addButtonListener(secondarybutton, (interaction) => {
                    interaction.respond({ content: 'Secondary Button Clicked', isPrivate: true })
                })
                interactiveClient.addButtonListener(successbutton, (interaction) => {
                    interaction.respond({ content: 'Success Button Clicked', isPrivate: true })
                })
                interactiveClient.addButtonListener(dangerbutton, (interaction) => {
                    interaction.respond({ content: 'Danger Button Clicked', isPrivate: true })
                })

                break;

            case "editable-buttons":
                const editableButtonCluster = new ComponentCluster(primarybutton, secondarybutton, successbutton, replacebutton, linkbutton)

                interaction.respond({
                    components: editableButtonCluster,
                    content: 'Buttons'
                })
                interactiveClient.addButtonListener(primarybutton, (interaction) => {
                    interaction.respond({ content: 'Primary Button Clicked', shouldEdit: true })
                })
                interactiveClient.addButtonListener(secondarybutton, (interaction) => {
                    interaction.respond({ content: 'Secondary Button Clicked', shouldEdit: true })
                })
                interactiveClient.addButtonListener(successbutton, (interaction) => {
                    interaction.respond({ content: 'Success Button Clicked', shouldEdit: true })
                })
                interactiveClient.addButtonListener(replacebutton, (interaction) => {
                    interaction.respond({ content: 'Replace Button Clicked', components: new ComponentCluster(killerbutton, reviverbutton), shouldEdit: true })
                })
                interactiveClient.addButtonListener(killerbutton, (interaction) => {
                    interaction.respond({ content: 'This button was the one that killed the others, be weary of him', isPrivate: true })
                })
                interactiveClient.addButtonListener(reviverbutton, (interaction) => {
                    interaction.respond({ content: 'Buttons', components: editableButtonCluster, shouldEdit: true });
                })

                break

            case "selection":

                const selectionCluster = new ComponentCluster(basicselection)

                interaction.respond({
                    components: new ComponentCluster(selectionbutton),
                    content: 'Selections'
                })

                interactiveClient.addButtonListener(selectionbutton, (interaction) => {
                    interaction.respond({ content: 'Selection Button Clicked', components: selectionCluster, isPrivate: true })
                })

                interactiveClient.addSelectionListener(basicselection, (interaction) => {
                    interaction.respond({ content: `Selected: ${interaction.selections?.join(",")}`, isPrivate: true })
                })

                break

            case "multi-select":

                const multiselectCluster = new ComponentCluster(multiselection)

                interaction.respond({
                    components: new ComponentCluster(multiselectbutton),
                    content: 'Multi Selection'
                })

                interactiveClient.addButtonListener(multiselectbutton, (interaction) => {
                    interaction.respond({ content: 'Multi Selection Button Clicked', components: multiselectCluster, isPrivate: true })
                })

                interactiveClient.addSelectionListener(multiselection, (interaction) => {
                    interaction.respond({ content: `Selected: ${interaction.selections?.join(",")}`, isPrivate: true })
                })

                break

            case "embed":

                const embed = new MessageEmbed();
                embed.setTitle('Interactive embed?')
                embed.setDescription('Try clicking one of the buttons below')

                const embedbuttonRow = new ComponentActionRow(hibutton, byebutton)

                interaction.respond({
                    components: embedbuttonRow,
                    content: 'Embed',
                    embeds: [embed]
                })

                interactiveClient.addButtonListener(hibutton, (interaction) => {
                    embed.setDescription('Hi button clicked')
                    interaction.respond({ shouldEdit: true, embeds: [embed] })

                })

                interactiveClient.addButtonListener(byebutton, (interaction) => {
                    embed.setDescription('Bye button clicked')
                    interaction.respond({ shouldEdit: true, embeds: [embed] })
                })

                break

            case "emoji":
                const emotionbuttonRow = new ComponentActionRow(happyemojibutton, sademojibutton)

                interaction.respond({
                    components: emotionbuttonRow,
                    content: 'Hello!'
                })

                interactiveClient.addButtonListener(happyemojibutton, (interaction) => {
                    interaction.respond({
                        content: `You made me <:ultrahappyduxcore:845821651240484864>`,
                        shouldEdit: true
                    })
                })

                interactiveClient.addButtonListener(sademojibutton, (interaction) => {
                    interaction.respond({
                        content: `You made me <:ultrasadduxcore:845821663395446794>`,
                        shouldEdit: true
                    })
                })
                break;

            case "defer-message":
                interaction.respond({ defer: 'message' });

                setTimeout(() => {
                    interaction.editOrignal({
                        content: 'I was editied in after 5 seconds!'
                    })
                }, 5000);

                break;

            case "defer-components":
                const cluster = new ComponentCluster(primarybutton);
                interactiveClient.addButtonListener(primarybutton, (interaction) => {
                    interaction.respond({ defer: 'components' });

                    const newCluster = new ComponentCluster(secondarybutton);
                    setTimeout(() => {
                        interaction.editOrignal({
                            content: 'Components edited after 5 seconds without loading state',
                            components: newCluster
                        })
                    }, 5000)
                })

                interaction.respond({
                    content: 'Orignal message with components',
                    components: cluster
                })

                break;
        }
    }
})


bot.on('message', (message) => {
    if (message.author.bot) return;

})

interactiveClient.on("buttonInteraction", (interaction) => {
    if (!interaction.isHandled) interaction.respond({ isPrivate: true, content: 'This interaction is over' })
})

interactiveClient.on("selectionInteraction", (interaction) => {
    if (!interaction.isHandled) interaction.respond({ isPrivate: true, content: 'This interaction is over' })
})


bot.login(process.env.TOKEN);