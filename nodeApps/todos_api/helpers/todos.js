var db = require('../models');

exports.getTodos = function(req, res){
    db.Todo.find()
    .then(function(todos){
        res.json(todos);
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.createTodo = function(req, res){
    db.Todo.create(req.body)
    .then(function(newTodo){
        res.status(201).json(newTodo); //return status 201 which means 'Created', if not it returns 200 which means 'OK'
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.getTodo = function(req, res){
    db.Todo.findById(req.params.todoId)
    .then(function(foundTodo){
        res.json(foundTodo);
    })
    .catch(function(err){
        res.send(err);
    })
}

// first parameter finds the dataset
// second one specifies what fields it updates
// third parameter tells the callback function that it returns the updated dataset(by default it returns the old dataset- pre updated)
exports.updateTodo = function(req, res){
    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
    .then(function(updatedTodo){
        res.json(updatedTodo);
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.deleteTodo = function(req, res){
    db.Todo.remove({_id: req.params.todoId})
    .then(function(){
        res.json({message: 'We deleted it!'})
    })
    .catch(function(err){
        res.send(err);
    })
}

module.exports = exports;
