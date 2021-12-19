import { Message, MessageEmbed } from 'discord.js';
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

    if (output.length > 4055) {
      output = output.substring(0, 4055);
    }
    output = output.replace(/\`/g, "'");
    output = `
    \`\`\`
    ${output}
    \`\`\`
      `;

    const exampleEmbed = new MessageEmbed()
      .setColor('#99D0EE')
      .setTitle('Hi, it is Cattobot, coming to you live!')
      .setURL('https://discord.js.org/')
      .setAuthor(
        'Cattobot',
        'https://i.imgur.com/AfFp7pu.png',
        'https://discord.js.org'
      )
      .setDescription(output)
      .setThumbnail('https://i.imgur.com/AfFp7pu.png')
      .addFields(
        {
          name: 'Cattobot is here to say some things!',
          value: '\u200B',
        },
        { name: '\u200B', value: '\u200B' }
        // { name: 'Inline field #1', value: 'Some value here', inline: true },
        //{ name: 'Inline field title', value: 'Some value here', inline: true }
      )
      //.addField('Cattobot is here to say some things!', 'Some value here', true)
      .setImage(
        'https://res.cloudinary.com/dxf0xc0dq/image/upload/c_scale,h_203,w_218/v1639885027/Untitled_2_fnxcuj.png'
      )
      .setTimestamp()
      .setFooter('\u3000'.repeat(1200 /*any big number works too*/) + '|');

    message.reply({ embeds: [exampleEmbed] });
  },
};
