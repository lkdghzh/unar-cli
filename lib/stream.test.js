// http://nodejs.cn/api/stream.html#stream_writable_write_chunk_encoding_callback
// http://nodejs.cn/api/stream.html#stream_event_drain

const fs = require('fs')
function pipe1(source, target) {
  let rs = fs.createReadStream(source, { highWaterMark: 2 })
  let ws = fs.createWriteStream(target, { highWaterMark: 1 })
  rs.on('data', function (chunk) {
    console.log(chunk, chunk.toString())
    //chunk为2大于等于ws的highWaterMark:1,返回false，否则返回
    // 一个自动过程
    //写入流会ws 自行消化 完rs提供的highWaterMark个字节，直到自行消化完，会自动触发写入流ws的drain事件，表示写入流又可以写入(写入流已经 空间耗尽 ，可继续写入)
    var flag=ws.write(chunk)
    console.log(flag)
  })
  ws.on('drain', function () {
    console.log('触发drain')
  })
}
// pipe1('1.txt', '2.txt')
/*
<Buffer 31 32> '12'
false
触发drain
<Buffer 33 34> '34'
false
触发drain
<Buffer 35 36> '56'
false
触发drain
<Buffer 37 38> '78'
false
触发drain
<Buffer 0a> '\n'
false
触发drain
*/

//永远不会触发 ws 的drain事件
function pipe2(source, target) {
  let rs = fs.createReadStream(source, { highWaterMark: 2 })
  let ws = fs.createWriteStream(target, { highWaterMark: 3 })
  rs.on('data', function (chunk) {
    console.log(chunk, chunk.toString())
    //每次写入 ws.write的时候，是否触发 ws的drain事件
    //chunk为2小于ws的highWaterMark:3,返回true
    // 每次写入。触发drain的一个自动过程
    //写入流会ws 自行消化 完rs提供的highWaterMark个字节，直到自行消化完，会自动触发写入流ws的drain事件，表示写入流又可以写入(写入流已经 排干 ，可继续写入)
    var flag=ws.write(chunk)
    console.log(flag)
  })
  ws.on('drain', function () {
    console.log('触发drain')
  })
}
pipe2('1.txt', '3.txt')
/*
<Buffer 31 32> '12'
true
<Buffer 33 34> '34'
true
<Buffer 35 36> '56'
true
<Buffer 37 38> '78'
true
<Buffer 0a> '\n'
true
*/
