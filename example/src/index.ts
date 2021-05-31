import Discord from 'discord.js';
import { config } from 'dotenv';
import InteractiveClient, { ButtonComponent, ComponentCluster, LinkButtonComponent } from '@duxcore/interactive-discord';
import { dangerbutton, linkbutton, primarybutton, replacebutton, secondarybutton, successbutton } from './constants';
import { ComponentObject } from '@duxcore/interactive-discord/lib/util/types/components';

config();
const bot = new Discord.Client();

const interactiveClient = new InteractiveClient(bot, bot.user?.id || "")



bot.once('ready', () => {
    console.log('Bot online')
})



bot.on('message', (message) => {
    if (message.author.bot) return;
    switch (message.content) {
        case "!buttons":
            const buttonCluster = new ComponentCluster(primarybutton, secondarybutton, successbutton, dangerbutton, linkbutton)

            // @ts-ignore
            message.channel.send({ content: 'Buttons', components: buttonCluster.compile() });

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

            const killerBtn = new ButtonComponent({ style: 4, label: 'I replaced the others' });
            const reviverBtn = new ButtonComponent({ style: 3, label: 'Bring them back!' });

            // @ts-ignore
            message.channel.send({ content: 'Buttons', components: editableButtonCluster.compile() });

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
                interaction.respond({ content: 'Replace Button Clicked', components: new ComponentCluster(killerBtn, reviverBtn), shouldEdit: true })
            })
            interactiveClient.addButtonListener(killerBtn, (interaction) => {
                interaction.respond({ content: 'This button was the one that killed the others, be weary of him', isPrivate: true })
            })
            interactiveClient.addButtonListener(reviverBtn, (interaction) => {
                interaction.respond({ content: 'Buttons', components: editableButtonCluster, shouldEdit: true });
            })

            break

        default:
            break;
    }
})

// interactiveClient.on('buttonInteraction', (interaction) => {

// })


bot.login(process.env.TOKEN);