#!/usr/bin/env node

import { program } from 'commander';
import { join } from 'path';
import { cwd } from 'process';
const { description, name, version } = require('../package.json');

import { main } from './download';

// Set the program's name, description, and version.
program.name(name).description(description).version(version);

// path [string]: Represents where the images will be saved.
program.option('-d, --directory <string>', 'determines where to save images to', join(cwd(), 'images'));

// Parse given command line arguments.
program.parse(process.argv);

main(program.directory);
