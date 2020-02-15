'use strict';

const dejsc = require('./index.js');

let args = process.argv.slice(2);

if (args.includes('-r')) {
  args[args.indexOf('-r')] = '--run';
}
if (args.includes('-f')) {
  args[args.indexOf('-f')] = '--fix';
}

if (args.includes('-g')) {
  args[args.indexOf('-g')] = '--guess';
}

if (args.includes('-t')) {
  args[args.indexOf('-t')] = '--tryload';
}

const program = {
    dirname: __dirname,
    filename: __filename,
    nodeBin: process.argv[0],
    flags: args.filter(arg => arg[0] === '-'),
    files: args.filter(arg => arg[0] !== '-' && arg[1] !== '-'),
};

if (program.flags.includes('--run')) {
    console.log("Hello World");
}