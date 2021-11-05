import DiscordJS, { Intents, Message } from 'discord.js';
import dotenv from 'dotenv';
import * as cowsay from 'cowsay';
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
    message.react('🤔').then(console.log).catch(console.error);
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
    message.react('🐱').then(console.log).catch(console.error);
    //reply to message
    let output: string = cowsay.say({
      text: 'Hello from typescript!',
      e: 'oO',
      T: 'U ',
    });
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
