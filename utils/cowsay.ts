import * as cowsay from 'cowsay';
import { IOptions } from 'cowsay'; // optional
import getRandomInt from './random';
import quotes from './quotes.json';

// Cowsay function
export default function () {
  //create variable to represent the quotes and to place them in random generator
  const random = getRandomInt(0, quotes.length);
  let opts: IOptions = {
    //This calls the random quotes then random author
    text: `${quotes[random].quote} - ${quotes[random].author}`,
    r: true,
  };

  let output: string = cowsay.say(opts);

  console.log(output);

  if (output.length > 2000) {
    cowsay.say({ text: 'Bye, bye!' });
  }
  return `
    \`\`\`
    ${output}
    \`\`\`
      `;
}
