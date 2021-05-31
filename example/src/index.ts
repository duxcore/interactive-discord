import Discord from 'discord.js';
import { config } from 'dotenv';
import InteractiveClient, { ButtonComponent, ComponentCluster, LinkButtonComponent } from '@duxcore/interactive-discord';
import { dangerbutton, linkbutton, primarybutton, secondarybutton, successbutton } from './constants';
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
            const editableButtonCluster = new ComponentCluster(primarybutton, secondarybutton, successbutton, dangerbutton, linkbutton)

            const newBtn = new ComponentCluster(new ButtonComponent({ style: 1, label: 'I replaced the others' }))
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
            interactiveClient.addButtonListener(dangerbutton, (interaction) => {
                interaction.respond({ content: 'I will replace other buttons', components: newBtn, shouldEdit: true })
            })

            break

        default:
            break;
    }
})

// interactiveClient.on('buttonInteraction', (interaction) => {

// })


bot.login(process.env.TOKEN);