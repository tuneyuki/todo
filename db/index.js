const fs = require('fs');

const FILE = "todoFile";

exports.writeTodoSync = function(data){
  fs.appendFileSync('todo.txt', data);
  console.log('file write success');
};


exports.writeTodoAsync = function(data, cb){
  fs.appendFile('todo.txt', data, (err) => {
    if(err) {
      cb(err);
    } else {
      console.log('File append success');
      cb();
    }
  });
};

exports.readTodoSync = function() {

};

exports.readTodoAsync = function(cb) {
  fs.readFile('todo.txt', (err, buffer) => {
    if(err) {
      console.error('File read fail', err);
      cb(err, null);
    } else {
      console.log('File read success');
      cb(null, buffer);
    }
  });
};