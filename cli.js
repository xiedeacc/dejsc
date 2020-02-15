#!/usr/bin/env node

const dejsc = require('./index.js');
const path = require('path');
const fs = require('fs');
const bytenode = require('bytenode')

let args = process.argv.slice(2);

if (args.includes('-r')) {
  args[args.indexOf('-r')] = '--run';
}
if (args.includes('-e')) {
    args[args.indexOf('-e')] = '--export';
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

console.log(process.version)

if (program.flags.includes('--run')) {
    program.files.forEach(function (filename) {
        filename = path.resolve(filename);
        if (fs.existsSync(filename) && fs.statSync(filename).isFile()) {
            let result = dejsc.runBytecodeFile(filename)
            console.log(result);
        } else {
            console.error(`Error: Cannot find file '${filename}'.`);
        }
    });
}

else if (program.flags.includes('--export')) {
    program.files.forEach(function (filename) {
        filename = path.resolve(filename);
        if (fs.existsSync(filename) && fs.statSync(filename).isFile()) {
            let fakeModule = {};
            fakeModule.exports = {};
            (dejsc.runBytecodeFile(filename))(fakeModule.exports, require, fakeModule, __filename, __dirname)
            console.log(fakeModule.exports);
        } else {
            console.error(`Error: Cannot find file '${filename}'.`);
        }
    });
}