var express = require('express');
var router = express.Router();
var db = require('../db');

var data = "";

/* GET home page. */
router.get('/', function(req, res, next) {
  db.readTodoAsync((err, data) => {
    if(err) {
      var array = [];
      res.render('index', {title: 'Todo Application', todo: array});
    } else {
      var array = String(data).split("¥n");
      array.pop();
      // console.log(array);
      for(let i=0; i<array.length; i++){
        array[i] = JSON.parse(array[i]);
      }
      console.log(array);
      console.log(sortTodoBydeadline(array));
      res.render('index', {title: 'Todo Application', todo: array});
    }
  });
});


router.get('/add', (req, res) => {
  res.render('add');
});

router.post('/add', (req, res) => {
  var id = parseInt(new Date() /1000);
  var data = makeTododata(id, req.body);
  db.writeTodoAsync(JSON.stringify(data)+"¥n", (err) => {
    if(err) {
      console.log('Error occured in writeFile')
      throw err;
    } else {
      res.redirect('/');
    }
  });
});


router.post('/del', (req, res) => {
  // console.log(req.body);
  res.redirect('/');
  for(let i in req.body) {
    console.log(i);
  }
});


function makeTododata(id, body) {
  var json = {
    id : id,
    todo : body.todo,
    deadline : body.deadline 
  }
  return json;
}

function sortTodoByid(todolist) {
  return todolist.sort(function(a, b) {
    return a.id - b.id;
  });
}

function sortTodoBydeadline(todolist) {
  return todolist.sort(function(a, b) {
    var dateA = new Date(a.deadline);
    var dateB = new Date(b.deadline);
    return dateA - dateB;
  });
}

module.exports = router;
