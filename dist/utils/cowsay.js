"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cowsay = (0, tslib_1.__importStar)(require("cowsay"));
const random_1 = (0, tslib_1.__importDefault)(require("./random"));
const quotes_json_1 = (0, tslib_1.__importDefault)(require("./quotes.json"));
const options = cowsay.list;
function default_1(specialCow = 'any') {
    const random = (0, random_1.default)(0, quotes_json_1.default.length);
    let opts = {
        text: `${quotes_json_1.default[random].quote} - ${quotes_json_1.default[random].author}`,
        r: true,
    };
    if (specialCow != 'any') {
        opts.r = false;
        opts.f = specialCow;
    }
    let output;
    try {
        output = cowsay.say(opts);
    }
    catch (error) {
        output = 'I am sorry, that cow does not exist.';
    }
    if (output.length > 2000) {
        output = 'I am sorry, that is too large.';
    }
    return `
    \`\`\`
    ${output}
    \`\`\`
      `;
}
exports.default = default_1;
