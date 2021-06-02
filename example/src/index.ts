import Discord, { DMChannel, TextChannel } from 'discord.js';
import { config } from 'dotenv';
import InteractiveClient, { ButtonComponent, ComponentCluster, LinkButtonComponent } from '@duxcore/interactive-discord';
import { dangerbutton, killerbutton, linkbutton, primarybutton, replacebutton, reviverbutton, secondarybutton, selectionbutton, successbutton, basicselection, multiselection, multiselectbutton } from './constants';
import { ComponentObject } from '@duxcore/interactive-discord/lib/util/types/components';

config();
const bot = new Discord.Client();

const interactiveClient = new InteractiveClient(bot)



bot.once('ready', () => {
    console.log('Bot online')
})



bot.on('message', (message) => {
    if (message.author.bot) return;
    switch (message.content) {
        case "!buttons":
            const buttonCluster = new ComponentCluster(primarybutton, secondarybutton, successbutton, dangerbutton, linkbutton)

            interactiveClient.sendComponents({
                channel: message.channel,
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

        case "!editable-buttons":
            const editableButtonCluster = new ComponentCluster(primarybutton, secondarybutton, successbutton, replacebutton, linkbutton)

            interactiveClient.sendComponents({
                channel: message.channel,
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

        case "!selection":

            const selectionCluster = new ComponentCluster(basicselection)

            interactiveClient.sendComponents({
                channel: message.channel,
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

        case "!multi-select":

            const multiselectCluster = new ComponentCluster(multiselection)

            interactiveClient.sendComponents({
                channel: message.channel,
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
    }
})


bot.login(process.env.TOKEN);