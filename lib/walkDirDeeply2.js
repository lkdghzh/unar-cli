const fs = require('fs')
const path = require('path')

function walkDirDeeply(dir, callback, fileCallback, dirCallback) {

  function next(i) {
    //归
    //第一级别目录 i 0 1 2  fileNames.length：3
    // if (i >= fileNames.length) {
    //   return callback()
    // }

    fs.stat(dir, function (err, stat) {
      if (err) {
        return console.error('error: ' + err + 'when stat path ' + dir)
      } else {
        if (stat.isDirectory()) {
          fs.readdir(dir, function (err, fileNames) {
            if (err) {
              return console.error('error: ' + err + 'when read path ' + dir)
            } else {
              let child = path.join(dir, fileNames[i])
              if (dirCallback) {
                dirCallback(child, () => walkDirDeeply(child, () => next(++i)))
              } else {
                walkDirDeeply(child, () => next(++i))
              }
            }
          })
        } else {
          if (fileCallback) {
            fileCallback(dir, () => next(++i))
          } else {
            next(++i)
          }
        }
      }
    })
  }
  next(0)
}

walkDirDeeply('a', function () {
  console.log('遍历完毕')
}, function (fileName, next) {
  console.log('file=>' + fileName)
  next()
}, function (dirName, next) {
  console.log('dir=>' + dirName)
  next()
})
// exports.walkDirDeeply = walkDirDeeply;
