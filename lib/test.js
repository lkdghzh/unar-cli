const fs = require('fs');
const path = require('path');

var files = fs.readdirSync('./')
console.log(files)
/*
[ '.DS_Store',
  '.editorconfig',
  '.git',
  '.gitignore',
  '.huskyrc',
  '.vscode',
  'README.md',
  'bin',
  'boilerplates',
  'commitlint.config.js',
  'lib',
  'node_modules',
  'package-lock.json',
  'package.json',
  'yarn.lock' ]
  */


var from = path.resolve('bin')
console.log(from)//  /Users/didi/myproject/unar-cli/bin

const { copyFile,copy } = require('./utils');

const source = path.resolve('boilerplates');
const destination = path.resolve('dist');

// copyFile(path.resolve('boilerplates'),path.resolve('dist'))
debugger
copy(source, destination);
