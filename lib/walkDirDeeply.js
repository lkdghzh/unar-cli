const fs = require('fs')
const path = require('path')

function walkDirDeeply(dir, callback, fileCallback, dirCallback) {
  fs.readdir(dir, function (err, fileNames) {
    function next(i) {
      //归
      //第一级别目录 i 0 1 2  fileNames.length：3
      if (i >= fileNames.length) {
        return callback()
      }
      let child = path.join(dir, fileNames[i])
      debugger
      console.log(i,child)
      fs.stat(child, function (err, stat) {
        if (stat.isDirectory()) {
          if (dirCallback) {
            dirCallback(child, () => walkDirDeeply(child, () => next(++i)))
          } else {
            walkDirDeeply(child, () => next(++i))
          }
        } else {
          if (fileCallback) {
            fileCallback(child, () => next(++i))
          } else {
            next(++i)
          }
        }
      })
    }
    if (!err) {
      next(0)
    } else {
      console.error('error:' + err + 'when readdir' + dir)
    }

  })
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
