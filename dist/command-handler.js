"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const get_files_1 = (0, tslib_1.__importDefault)(require("./get-files"));
const dotenv_1 = (0, tslib_1.__importDefault)(require("dotenv"));
const prefix = process.env.PREFIX || '#am';
const CHANNELS = process.env.CHANNELS || null;
if (!CHANNELS) {
    console.error('CHANNELS is not defined');
    process.exit(1);
}
const channels = CHANNELS.split(',');
console.table(channels);
dotenv_1.default.config();
let suffix = '.ts';
let src = 'src';
if (process.env.NODE_ENV === 'production') {
    suffix = '.js';
    src = 'dist';
    console.log('Running in production mode');
}
exports.default = (client) => {
    const commands = {};
    const suffix = '.ts';
    const commandFiles = (0, get_files_1.default)(src, './commands', suffix);
    console.log(commandFiles);
    console.log(commands);
    for (const command of commandFiles) {
        let commandFile = require(command);
        if (commandFile.default)
            commandFile = commandFile.default;
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
        if (!channels.includes(message.channel.id))
            return;
        if (!message.content.startsWith(prefix)) {
            return;
        }
        else
            message.content.startsWith(prefix);
        const args = message.content.slice(3).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        console.log(commandName);
        if (!commands[commandName]) {
            return;
        }
        try {
            commands[commandName].callback(message, ...args);
        }
        catch (error) {
            console.error(error);
        }
    });
};
