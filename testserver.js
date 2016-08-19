var FS = require('fs')
    promise = require('bluebird'),
    fs = promise.promisifyAll(FS.readFile);
fs('test.txt','utf-8')
  .then(function(fileData){
    console.log(fileData);
    return fs('test2.txt','utf-8');
  })
  .then(function(fileData){
    console.log(fileData);
  })
  .catch(function(err){
    if(err) throw err;
  });
