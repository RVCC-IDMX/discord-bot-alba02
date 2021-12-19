import { Message } from 'discord.js';
import * as cowsay from 'cowsay';
import { IOptions } from 'cowsay'; // optional
import getRandomInt from '../utils/random';
import quotes from '../utils/quotes.json';

export default {
  callback: (message: Message, ...args: string[]) => {
    console.log(args);
    const specialCow = args[0] || 'any';
    //create variable to represent the quotes and to place them in random generator
    const random = getRandomInt(0, quotes.length);
    let opts: IOptions = {
      //This calls the random quotes then random author
      text: `${quotes[random].quote} - ${quotes[random].author}`,
      r: true,
    };

    if (specialCow != 'any') {
      opts.r = false;
      opts.f = specialCow;
    }

    let output;
    try {
      output = cowsay.say(opts);
    } catch (error) {
      output = 'I am sorry, that cow does not exist.';
    }

    // Not random cow, specialcow

    if (output.length > 2000) {
      output = 'I am sorry, that is too large.';
    }
    output = `
    \`\`\`
    ${output}
    \`\`\`
      `;

    message.reply(output);
  },
};
