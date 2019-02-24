const fs = require('fs');
const path = require('path');

var files = fs.readdirSync('./')
// console.log(files)
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
// console.log(from)//  /Users/didi/myproject/unar-cli/bin

const { copyFile, copy, mkdirp } = require('./utils');

const source = path.resolve('boilerplates');
const destination = path.resolve('dist');

// copyFile(path.resolve('boilerplates'),path.resolve('dist'))

copy(source, destination);
// mkdirp('a/b/c/d/e/f', function (err) {
//   if (err) return console.log(err)
//   console.log('创建目录成功')
// })
// mkdirp('c/d/e/f', function (err) {
//   if (err) return console.log(err)
//   console.log('创建目录成功')
// })

// mkdirp(destination, function (err) {
//   if (err) return console.log(err)
//   console.log('创建目录成功')
// })

// console.log(path.join(__dirname,'./'))
// console.log(path.resolve())
// console.log(path.resolve('a','./'))

// console.log(process.cwd())
// console.log(path.join(process.cwd(),'./'))





