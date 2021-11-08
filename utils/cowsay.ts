import * as cowsay from 'cowsay';
import { IOptions } from 'cowsay'; // optional
import getRandomInt from './random';
import quotes from './quotes.json';

const options = cowsay.list;

// Cowsay function
export default function (specialCow: string = 'any') {
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
    cowsay.say({ text: 'Bye, bye!' });
  }
  return `
    \`\`\`
    ${output}
    \`\`\`
      `;
}
