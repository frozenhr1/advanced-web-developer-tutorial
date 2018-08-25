$(document).ready(function(){
    $.getJSON('/api/todos')
    .then(addTodos)

    $('#todoInput').keypress(function(event){
        if(event.which == 13){
            createTodo();
        }
    });

    /*
        ---event delegation---
        we cannot add click event on span because span wasnt appended on the page yet
        so what we do is, we attatch the event on .list element, and inside the list element
        we only accept clicks on the span element
    */

    $('.list').on('click', 'li', function(){
        updateTodo($(this));
    })

    $('.list').on('click', 'span', function(e){
        e.stopPropagation(); // ---event bubbling--- so when we click on the span, it wont also trigger the click on the li element
        removeTodo($(this).parent());
    })

});

function addTodos(todos){
    todos.forEach(function(todo){
        addTodo(todo);
    })
}

function addTodo(todo){
    /* if pure javascript:
        document.createElement` to make the list item, `append` or `appendChild` to add it to an HTML element
    */
    var newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>');
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
    if(todo.completed){
        newTodo.addClass('done');
    }
    $('.list').append(newTodo);
}

function createTodo(){
    var userInput = $('#todoInput').val();
    $.post('api/todos', {name: userInput})
    .then(function(newTodo){
        addTodo(newTodo);
        $('#todoInput').val('');
    })
    .catch(function(err){
        console.log(err);
    })
}

function removeTodo(todo){
    var clickedId = todo.data('id');
    var deleteUrl = '/api/todos/' + clickedId;
    $.ajax({
        method: 'DELETE',
        url: deleteUrl
    })
    .then(function(data){
        todo.remove();
    })
    .catch(function(err){
        console.log(err);
    })
}

function updateTodo(todo){
    var updateUrl = '/api/todos/' + todo.data('id');
    var isDone = !todo.data('completed');
    var updateData = {completed: isDone};
    $.ajax({
        method: 'PUT',
        url: updateUrl,
        data: updateData

    })
    .then(function(updatedTodo){
        todo.toggleClass('done');
        todo.data('completed', isDone);
    })
}
