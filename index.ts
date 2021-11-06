import DiscordJS, { Intents, Message } from 'discord.js';
import dotenv from 'dotenv';
import * as cowsay from 'cowsay';

import { IOptions } from 'cowsay'; // optional

dotenv.config();

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  console.log('The bot is ready');
});

client.on('messageCreate', (message) => {
  // Ping
  if (message.content === 'ping') {
    // React to a message with a unicode emoji
    message
      .react('🍒')
      .then(() => console.log(`Reacted to message "${message.content}"`))
      .catch(console.error);
    message
      .reply({
        content: 'pong',
      })
      .then(() => console.log(`Replied to message "${message.content}"`))
      .catch(console.error);
  }

  // Cowsay

  if (message.content === 'cowsay') {
    // React to a message with a unicode emoji
    message
      .react('🐱')
      .then(() => console.log(`Reacted to message "${message.content}"`))
      .catch(console.error);
    //reply to message

    let opts: IOptions = {
      text: 'Hello from Type!',
      e: 'xx',
      f: 'hellokitty',
      // r: true,
    };

    let output: string = cowsay.say(opts);
    console.log(output);
    message
      .reply({
        content: `
    \`\`\`
    ${output}
    \`\`\`
      `,
      })
      .then(() => console.log(`Replied to message "${message.content}"`))
      .catch(console.error);
  }
});

client.login(process.env.TOKEN);
