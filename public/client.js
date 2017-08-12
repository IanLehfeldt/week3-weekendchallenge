$(document).ready(function () {
    console.log('jQuery is sourced, dawg');
    getToDoList();

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
        var $toDoDiv = $('<div></div>');
        $toDoDiv.append(listItem.toDoItem);

        $('#toDoList').append($toDoDiv);
    }
}