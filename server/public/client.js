$(document).ready(function(){
    console.log('jQuery is sourced, dawg');
    $('#inputButton').on('click', function(){
        console.log('inputDiv button was clicked!');
        var toDoInput = $('#toDoInput').val();
        var toDoObject = {
            toDo: toDoInput
        }
        console.log(toDoInput);
        $.ajax({
            method: 'POST',
            url: '/toDoRoute',
            data: toDoObject,
            success: function (response){
                console.log(response);
            }
        })
    })
})