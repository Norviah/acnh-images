#!/usr/bin/env node

import { program } from 'commander';
import { homedir } from 'os';
import { join } from 'path';
import { cwd } from 'process';
const { description, name, version } = require('../package.json');

import { main } from './download';

// Set the program's name and description.
program.name(name).description(description);

// Ccommander sets the flag for as '-V', so we manually change it to '-v'.
program.version(version, '-v, --version', 'prints the current version');

// Represents how to download each image as.
program.option(
  '-f, --format <string>',
  `represents the format to save each image as`,
  join(cwd(), 'images', '%s', '%n', '%v', '%f.png')
);

// Parse given command line arguments.
program.parse(process.argv);

// If a user wants to pass in a space for the format, they'll have to pass in a
// string, but, if they pass a string and use a tilde to represent the home
// directory, it wouldn't get expanded as it's a string. So, we replace it with
// the user's home directory only if the tilde is the first character.
const format: string = program.format.replace(/^~/, homedir());

main(format);
