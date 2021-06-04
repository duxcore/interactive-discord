<h1 align="center">
  Interactive Discord <br>
    <a href="https://discord.gg/dTGJ5Bchnq">
    <img src="https://img.shields.io/discord/844279877503025182?label=Discord&logo=discord&logoColor=white&style=for-the-badge" />
  </a>
  <a href="https://www.npmjs.com/package/@duxcore/interactive-discord">
    <img src="https://img.shields.io/npm/dw/@duxcore/interactive-discord?logo=npm&style=for-the-badge" />
    <img src="https://img.shields.io/npm/v/@duxcore/interactive-discord/latest?label=Latest%20Version&style=for-the-badge" />
  </a>
</h1>

Interactive discord is a library that will allow you to integrate discord interactions such as [slash commands](https://discord.com/developers/docs/interactions/slash-commands) and [message components](https://discord.com/developers/docs/interactions/message-components) into your [discord.js](https://discord.js.org/) bot.

## Slash commands
Slash commands are Discord's integration of a command handeling system.  Slash commands are there so that bot developers do not have to use a custom command prefix with every bot.  The way that they work is that you will send the information about your command and Discord will display that command along with the build-in commands and commands from other bots.  These commands will allow you to have many cool features such as command descriptions, command options, and much more.

If you would like to integrate this into your bot, you can refer to [this](https://github.com/duxcore/interactive-discord/tree/main/examples/slash_commands) for a full example with comments on how to integrate them into your bot.

> **NOTE**: If you register or create too many commands too fast, you will get ratelimited by Discord.

## Message Components
Message components are things like buttons and selections that you can add to a message.  These componets are here to give bot developers more options when it comes to creating an immersive and interactive experience for users.  This library will allow you to implement these components into your discord bot. 

If you would like to integrate this into your bot, you can refer to [this](https://github.com/duxcore/interactive-discord/tree/main/examples/message_components) for a full example with comments on how to integrate them into your bot.

> **NOTE:** Selection menus are currently in beta and hence only people with the experiment `Bot UI Kit Select` enabled can see and interact with them

<hr>

#### Adds support for:
- Slash Commands

  - Creating slash commands
  - Responding to slash commands
  - Editing/Deleting slash commands

- Buttons

  - Creating and sending buttons
  - Responding to buttons

- Selection Menus **`BETA`**

  - Creating and sending selection menus
  - Responding to selection menus
