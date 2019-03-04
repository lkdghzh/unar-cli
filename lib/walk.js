var fs = require('fs');



var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      console.log('list-', list, i-1)
      if (!file) {
        console.log(results, i)
        return done(null, results);
      }
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          console.log(file)
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          // console.log(file)
          results.push(file);
          next();
        }
      });
    })();
  });
};


walk('a',function(err,results){
  console.log(results)
})
