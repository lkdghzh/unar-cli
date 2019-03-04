const fs = require('fs')
const path = require('path')

function walkDirDeeply(dir, callback) {
  console.log(dir)
  fs.readdir(dir, function (err, fileNames) {
    function next(i) {
      if (i >= fileNames.length) {
        return callback()
      }
      let child = path.join(dir, fileNames[i])
      console.log('---------',child)
      fs.stat(child, function (err, stat) {
        if (stat.isDirectory()) {
          walkDirDeeply(child, () => next(i + 1))
        } else {
          console.log('file=>', child)
          next(i + 1)
        }
      })
    }
    next(0)
  })
}
walkDirDeeply('a', function () {
  console.log('遍历完毕')
})
// exports.walkDirDeeply = walkDirDeeply;
