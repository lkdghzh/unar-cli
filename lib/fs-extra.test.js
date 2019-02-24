const fs = require('fs-extra')
const ncp = require('ncp').ncp
// fs.copy('./boilerplates','./dist',function(err,fff){
//   console.log(err,fff)//null undefined 拿不到当前文件路径?
// })

ncp('./boilerplates','./dist',function (err,ddd) {
  if (err) {
    return console.error(err);
  }
  console.log('done!');
  console.log(arguments);
 });
