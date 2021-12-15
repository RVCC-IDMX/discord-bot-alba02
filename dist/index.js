'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const discord_js_1 = (0, tslib_1.__importStar)(require('discord.js'));
const dotenv_1 = (0, tslib_1.__importDefault)(require('dotenv'));
const cowsay_1 = (0, tslib_1.__importDefault)(require('./utils/cowsay'));
dotenv_1.default.config();
const prefix = process.env.PREFIX || '#am';
const CHANNELS = process.env.CHANNELS || null;
if (!CHANNELS) {
  console.error('CHANNELS is not defined');
  process.exit(1);
}
const channels = CHANNELS.split(',');
console.table(channels);
const client = new discord_js_1.default.Client({
  intents: [
    discord_js_1.Intents.FLAGS.GUILDS,
    discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
  ],
});
client.on('ready', () => {
  console.log('The bot is ready');
});
client.on('messageCreate', (message) => {
  if (!channels.includes(message.channel.id)) return;
  if (!message.content.startsWith(prefix)) {
    return;
  } else message.content.startsWith(prefix);
  const args = message.content
    .toLowerCase()
    .substring(prefix.length)
    .slice()
    .trim()
    .split(/ /);
  const command = args.shift();
  if (command === 'ping') {
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
  if (command === 'cowsay') {
    message
      .react('🐱')
      .then(() => console.log(`Reacted to message "${message.content}"`))
      .catch(console.error);
    const output = (0, cowsay_1.default)(args[0]);
    message
      .reply(output)
      .then(() => console.log(`Replied to message "${message.content}"`))
      .catch(console.error);
  }
});
client.login(process.env.TOKEN);
