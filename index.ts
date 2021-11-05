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
    message.reply({
      content: 'pong',
    });
  }

  // Cowsay
  let output: string = cowsay.say({
    text: 'Hello from typescript!',
    e: 'oO',
    T: 'U ',
  });
  console.log(output);
  if (message.content === 'cowsay') {
    message.reply({
      content: `
    \`\`\`
    ${output}
    \`\`\`
      `,
    });
  }
});

client.login(process.env.TOKEN);
