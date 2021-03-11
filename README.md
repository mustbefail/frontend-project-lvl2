# Difference calculator

Command line utility for calculating and displaying changes to configuration files. The [Commander.js](https://github.com/tj/commander.js) library is used to implement the CLI behavior.

[![asciicast](https://asciinema.org/a/kCzVza4FSYwOtq42sIoK2SWUb.svg)](https://asciinema.org/a/kCzVza4FSYwOtq42sIoK2SWUb)

### Hexlet tests and linter status: [![Actions Status](https://github.com/mustbefail/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/mustbefail/frontend-project-lvl2/actions)

## Install

```sh
make install
#install all deps
```

### Install as CLI

```sh
$ make publish
$ npm link
# install to OS as global npm package
$ gendiff <filepath1> <filepath2>
# get difference of two configuration files 
$ gendiff -h
# get help
```

### Use as library

```js
//ESM modules
import diff from 'gendiff'
```
