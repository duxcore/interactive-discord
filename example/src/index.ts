import Discord from 'discord.js';
import { config } from 'dotenv';
import InteractiveClient, { ButtonComponent, ComponentCluster, LinkButtonComponent } from '@duxcore/interactive-discord';
import { dangerbutton, linkbutton, primarybutton, secondarybutton, successbutton } from './constants';

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

            break;

        default:
            break;
    }
})

interactiveClient.on('buttonInteraction', (interaction) => {

})


bot.login(process.env.TOKEN);