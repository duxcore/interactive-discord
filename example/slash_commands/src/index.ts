/** ### IMPORTS ### */
import Discord from 'discord.js';
import { config } from 'dotenv';
import InteractiveClient, { SlashCommand } from '@duxcore/interactive-discord';

config(); // Import your env varibles.

const client = new Discord.Client(); // Initialize your Discord.JS Client

// Once your Discord Client has started this event will be triggered.
client.on('ready', () => {
  console.log("Bot Started!");
  const myGuild = '844279877503025182';  // Your guild's id for later.

  /**
   * Initialize your Interactive Discord Client
   * 
   * Be sure to initilize this client after you have logged into discord because
   * if you don't, you might run into a problem of the interactive client not having
   * access to your bot token which is required to authenticate your API calls to Discord.
   */
  const interactions = new InteractiveClient(client);

  /**
   * Create your first command
   * 
   * This command will be called "ping" and it will simply respond to your command 
   * by saying "Pong!";
   */
  const ping = new SlashCommand({
    name: "ping",
    description: 'This is a test command that will return "Pong!"'
  });

  // Create your listener for the ping command
  interactions.addCommandListener(ping, interaction => {
    interaction.respond({
      content: "Pong!"
    })
  })

  /**
   * Register your command
   * 
   * If you would like to only register this command for a certian guild, place your guild id's in an
   * array as the second parameter.
   */
  interactions.commands.register(ping); // Global command
  interactions.commands.register(ping, [ myGuild ]) // Guild bound command (you can have multiple guilds here.)

});

// Login to Discord using your Discord bot token.
client.login(process.env.TOKEN);