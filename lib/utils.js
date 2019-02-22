/**
 *
 * 创建多目录
 * 拷贝目录及文件相关方法
 *
 */
const fs = require('fs')
const path = require('path')

//拷贝文件
function copyFile(from, to, callback) {
  debugger
  const rs = fs.createReadStream(from);
  const ws = fs.createWriteStream(to);
  rs.on('error', function (err) {
    callback && callback('读除文件是发生错误:' + err)
  })
  ws.on('error', function (err) {
    callback && callback('写入文件是发生错误:' + err)
  })
  //需要查看pipe实现,callback的传参没有实现
  rs.pipe(ws)
}

exports.copyFile = copyFile;

//拷贝文件夹
function copy(from, to, callback) {
  //makep(to) 如果to的路径不存在，需要递归创建
  fs.readdir(from, function (err, fileNames) {
    fileNames.forEach(fileName => {
      //新目录
      const childFromPath = path.join(from, fileName);
      const childToPath = path.join(to, fileName);
      fs.stat(childFromPath, function (err, stats) {
        if (stats.isFile()) {
          copyFile(childFromPath, childToPath, callback)
        } else if (stats.isDirectory()) {
          //创建目录
          fs.mkdir(childToPath)
          copy(childFromPath, childToPath, callback)
        } else {
          console.log('不是文件，也不是文件夹')
        }
      })
    })
  })
}
exports.copy = copy;

//创建多级目录
// ./a/b/c/d
function mkdirp(dir, callback) {
  // ['a','b','c','d']
  // dirs.forEach((dir, dirInx) => {
  //   const currentDir = dirs.slice(0, dirInx + 1)
  //   fs.mkdir(currentDir)//这个是异步的  虽然有回调队列，事件队列，创建文件夹多个回调，不能保证执行顺序
  // })
  const dirs = dir.split('/')
  var index = 0
  function make(p) {
    if (dirs.length - 1 < index) {
      return callback(null);
    }
    fs.mkdir(p, function (err) {
      console.log('要去创建', p)
      if (err) {
        if (err.code === 'EEXIST') {
          //如果文件夹存在
          var p1 = dirs.slice(0, ++index + 1).join('/')
          console.log(`${p} 已经存在，保持${p}不动，自动创建下个${p1}`)
          return make(p1)
        } else {
          return callback(err);
        }
      }
      var p2 = dirs.slice(0, ++index + 1).join('/')
      console.log('p2', p2)
      make(p2)
    })
  }
  make(dirs[0])
}
exports.mkdirp = mkdirp;

