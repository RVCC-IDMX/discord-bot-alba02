import { Client } from 'discord.js';
import getFiles from './get-files';
import dotenv from 'dotenv';

const prefix = process.env.PREFIX || '#am';

const CHANNELS = process.env.CHANNELS || null;

if (!CHANNELS) {
  console.error('CHANNELS is not defined');
  process.exit(1);
}

const channels = CHANNELS.split(',');
console.table(channels);

dotenv.config();

let suffix = '.ts';
let src = 'src';
if (process.env.NODE_ENV === 'production') {
  suffix = '.js';
  src = 'dist';
  console.log('Running in production mode');
}

export default (client: Client) => {
  const commands = {} as {
    [key: string]: any;
  };

  const commandFiles = getFiles(src, './commands', suffix);
  console.log(commandFiles);

  console.log(commands);

  for (const command of commandFiles) {
    let commandFile = require(command);
    if (commandFile.default) commandFile = commandFile.default;

    const split = command.replace(/\\/g, '/').split('/');
    const commandName = split[split.length - 1].replace(suffix, '');

    commands[commandName.toLowerCase()] = commandFile;
  }

  console.log(commands);

  client.on('messageCreate', (message) => {
    console.log(message.content);
    if (message.author.bot || !message.content.startsWith(prefix)) {
      return;
    }
    if (!channels.includes(message.channel.id)) return;
    if (!message.content.startsWith(prefix)) {
      return;
    } else message.content.startsWith(prefix);

    const args = message.content.slice(3).trim().split(/ +/);
    const commandName = args.shift()!.toLowerCase();
    console.log(commandName);

    if (!commands[commandName]) {
      return;
    }

    try {
      commands[commandName].callback(message, ...args);
    } catch (error) {
      console.error(error);
    }
  });
};
