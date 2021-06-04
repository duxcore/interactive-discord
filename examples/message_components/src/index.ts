/** ### IMPORTS ### */
import Discord from 'discord.js';
import { config } from 'dotenv';
import InteractiveClient, { ButtonComponent, ButtonStyle, ComponentActionRow, ComponentCluster, SlashCommand } from '@duxcore/interactive-discord';

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
   * Create a component row
   * 
   * This component row will consist of two buttons which will allow you to send new messages
   * when these buttons are clicked.
   */
  const btn1 = new ButtonComponent({ label: "Hello", style: ButtonStyle.Success });
  const btn2 = new ButtonComponent({ label: "Goodbye", style: ButtonStyle.Danger})

  const row = new ComponentActionRow(btn1, btn2);
  const cluster = new ComponentCluster(row); // This will allow you to cluster a bunch of components into a single object

  interactions.addButtonListener(btn1, interaction => {
    interaction.respond({
      content: "Hello there, I hope you're having a good day!",
      isPrivate: true
    });
  });

  interactions.addButtonListener(btn2, interaction => {
    interaction.respond({
      content: "Goodbye, I hope to see you again soon!",
      isPrivate: true
    });
  });

  /**
   * Create your first command
   * 
   * This command will be called "ping" and it will simply respond to your command 
   * by saying "Pong!";
   */
  const ping = new SlashCommand({
    name: "ping",
    description: 'This is a test command that will return "Pong!"',
  });

  // Create your listener for the ping command
  interactions.addCommandListener(ping, interaction => {
    interaction.respond({
      content: "Pong!",
      components: cluster // Send the cluster object we just made, or just send any single component
    });
  });

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