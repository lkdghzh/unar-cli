const fs = require('fs-extra')
fs.copy('./boilerplates','./dist',function(err,fff){
  console.log(err,fff)//null undefined 拿不到当前文件路径?
})
