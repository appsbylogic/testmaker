var lines
var answers

function leer(){
    $.get('js/test.txt', function(data) {
        lines = data.split("\n");
    
        
            
     });
    
     $.get('js/respuestas.txt', function(data) {
        answers = data.split("\n");
        
        console.log(answers[0])
        next()
     });

     

}

var correcta 

var pregunta = 0
 function next(){
    $('#correct').html('')
    $('input[name=group1]:checked').prop('checked', 'false')
    $('#nextQ').addClass('disabled')

    correcta = Math.floor(Math.random()*3)
    
    console.log(correcta)
    if(correcta == 0){
        $('#1').html(answers[pregunta])
        $('#2').html(answers[Math.floor(Math.random()*answers.length)])
        $('#3').html(answers[Math.floor(Math.random()*answers.length)])
        $('#4').html(answers[Math.floor(Math.random()*answers.length)])
        console.log(correcta)
    }
    if(correcta == 1){
        $('#2').html(answers[pregunta])
        $('#1').html(answers[Math.floor(Math.random()*answers.length)])
        $('#3').html(answers[Math.floor(Math.random()*answers.length)])
        $('#4').html(answers[Math.floor(Math.random()*answers.length)])

    }
    if(correcta == 2){
        $('#3').html(answers[pregunta])
        $('#2').html(answers[Math.floor(Math.random()*answers.length)])
        $('#1').html(answers[Math.floor(Math.random()*answers.length)])
        $('#4').html(answers[Math.floor(Math.random()*answers.length)])

    }
    if(correcta == 3){
        $('#4').html(answers[pregunta])
        $('#2').html(answers[Math.floor(Math.random()*answers.length)])
        $('#3').html(answers[Math.floor(Math.random()*answers.length)])
        $('#1').html(answers[Math.floor(Math.random()*answers.length)])

    }


    $('.question').html(lines[pregunta])

 }

 var res

 function select(value){

   res = value
   console.log(res)

 }


function nextQuestion(){

    pregunta +=1

    next()

}

 function check(){
    console.log(correcta)
    res = $('input[name=group1]:checked').val()
    console.log(res)
    if(res == correcta){
        $('#correct').html('check')
        $('#nextQ').removeClass('disabled')
        
    }else{

        $('#correct').html('close')

    }

 }

leer()