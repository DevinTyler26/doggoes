'use strict';

function getDogs(){
  $.getJSON('/dogs').then(results => {
    showDogs(results);
  });
}

function newDog(name, is_good_dog, breed, age){
    $.post('/dogs', {
        name,
        is_good_dog,
        breed,
        age 
    }).then(results => {
        console.log(results);
        getDogs();
    });
}

function showDogs(dogs){
    var $ul = $('#dogs')
    $ul.empty()
    dogs.forEach(dog =>{
        $ul.append(`<li>${dog.name} , ${dog.is_good_dog}, ${dog.breed}, ${dog.age}</li>`)
    })
}

$('#create-dog').on('submit', (e) => {
    e.preventDefault()
    var name = $('#name').val()
    var igd = $('#is_good_dog option:selected').val()
    var breed = $('#breed').val()
    var age = $('#age').val()
    newDog(name, igd, breed, age)
})