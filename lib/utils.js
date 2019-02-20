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
    callback&&callback('读除文件是发生错误:' + err)
  })
  ws.on('error', function (err) {
    callback&&callback('写入文件是发生错误:' + err)
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
function mkdirp(path, callback) {
  fs.stat(from, function (err, stats) {
    if (err) {
      return callback('拷贝时候发生错误')
    }

  })
}
