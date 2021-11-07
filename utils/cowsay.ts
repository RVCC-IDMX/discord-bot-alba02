import * as cowsay from 'cowsay';
import { IOptions } from 'cowsay'; // optional
import getRandomInt from './random';
// Cowsay function
export default function () {
  let opts: IOptions = {
    text: 'Hello from Typescript!',
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
