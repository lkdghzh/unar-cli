let fs = require('fs')

function walk(p, done) {
  console.log(p)
  fs.readdir(p, function (e, fileNames) {
    function next(i) {
      if (fileNames) {
        return done(null)
      }
      fs.stat(p, function (err, pathStat) {
        if (pathStat.isDirectory()) {
          walk(p + '/' + fileNames[i], function () {
            next(i + 1)
          })
        } else {
          console.log('file=>' + p)
        }
      })
    }
    next(0)
  })
}

walk('a', function () {
  console.log('done')
})
