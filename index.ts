import DiscordJS, { Intents, Message } from 'discord.js';
import dotenv from 'dotenv';
import cowsay from './utils/cowsay';

dotenv.config();
const prefix = process.env.PREFIX || '#am';

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  console.log('The bot is ready');
});

client.on('messageCreate', (message) => {
  //prefix code
  if (!message.content.startsWith(prefix)) {
    return;
  }

  //arg code
  const args = message.content
    .toLowerCase()
    .substring(prefix.length)
    .slice()
    .split(/ /);

  const command = args.shift();

  // Ping//
  if (command === 'ping') {
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
  //cowsay
  if (command === 'cowsay') {
    message.react('🐱').then(console.log).catch(console.error);
    const output = cowsay();
    message.reply(output).then(console.log).catch(console.error);
  }
});

client.login(process.env.TOKEN);
