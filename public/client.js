$(document).ready(function () {
    console.log('jQuery is sourced, dawg');
    getToDoList();

    $('#toDoList').on('click', '#toDoCheckbox', function(){
        console.log('Checkbox was clicked');
        var toDoId = $(this).parent().data().id;
        console.log(toDoId);
        
        $.ajax({
            method: 'PUT',
            url: '/toDoRoute/' + toDoId,
            success: function (response){
                console.log(response);
                getToDoList();
            }
        })
    });

    $('#inputButton').on('click', function () {
        console.log('inputDiv button was clicked!');
        var toDoInput = $('#toDoInput').val();
        var toDoObject = {
            toDo: toDoInput,
            complete: 'N'
        }
        console.log(toDoInput);
        $.ajax({
            method: 'POST',
            url: '/toDoRoute',
            data: toDoObject,
            success: function (response) {
                console.log(response);
                getToDoList();
            }
        });//end of post ajax request
    });//end of inputbutton event


});//end of jquery

function getToDoList() {
    $.ajax({
        method: 'GET',
        url: '/toDoRoute',
        success: function (response) {
            console.log(response);
            drawToDoList(response);
        }
    });
}

function drawToDoList(toDoListArray) {
    $('#toDoList').empty();
    for (var i = 0; i < toDoListArray.length; i++) {

        var listItem = toDoListArray[i];

        var $toDoDelete = $('<button id="deleteToDo">Delete</button>');
        var $toDoCheckbox = $('<input type="checkbox" id="toDoCheckbox">');

        if (listItem.completed == 'N'){
            var $toDoDiv = $('<div class="needsToBeDone"></div>');
            $toDoDiv.data('id', listItem.id);
            $('#toDoList').prepend($toDoDiv, '<br>');
            $toDoDiv.prepend(listItem.toDoItem, '<br>', "Completed:", $toDoCheckbox, '<br>');
            $toDoDiv.append($toDoDelete);
        } else {
            var $completedDiv = $('<div class="completed"></div>');
            $completedDiv.data('id', listItem.id);
            $('#toDoList').append($completedDiv, '<br>');
            $completedDiv.append(listItem.toDoItem, '<br>', "Completed:", $toDoCheckbox, '<br>');
            $completedDiv.append($toDoDelete);
        }

    }
}