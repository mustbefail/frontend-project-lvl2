#! /usr/bin/env node

import { Command } from 'commander/esm.mjs';
import difference from '../src/diff.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format');

program
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => console.log(difference(filepath1, filepath2)));

program.parse(process.argv);

if (!program.args.length) program.help();
