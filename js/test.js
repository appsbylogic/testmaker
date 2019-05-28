var lines
var answers
var respuestas
var preguntas
var instances
var instance
$(document).ready(function(){
    $('.modal').modal();
    $('.collapsible').collapsible();
  });
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelector('.collapsible');
    instances = M.Collapsible.init(elems);
    instance = M.Collapsible.getInstance(elems);
  });

function leer(preguntas, respuestas){
    $.get(preguntas, function(data) {
        lines = data.split("\n");
        console.log(lines.length)
        
            
     });
    
     $.get(respuestas, function(data) {
        answers = data.split("\n");
        
        console.log(answers.length)
        
     });

     

}

function inputRes(respuestas){

    this.respuestas = respuestas

}

function inputPreg(preguntas){

    this.preguntas = preguntas

}

function submit(){

    

    var preguntas = document.getElementById('input').files[0];
    var respuestas = document.getElementById('input2').files[0];
    if (preguntas) {
        // create reader
        var reader = new FileReader();
        reader.readAsText(preguntas);
        reader.onload = function(e) {
            // browser completed reading file - display it
            lines = e.target.result.split("\n")

            for(var i = 0;i<lines.length;i++){

                lines[i].trim()
               
                if(lines[i] == "\n" || lines[i].trim().length == 0){
                    
                    lines.splice(i,1)

                }

                


            }

           
            
        };
    }


    if (respuestas) {
        // create reader
        var reader = new FileReader();
        reader.readAsText(respuestas);
        reader.onload = function(e) {
            // browser completed reading file - display it
            answers = e.target.result.split("\n")

            for(var i = 0;i<answers.length;i++){

                answers[i].trim()
               
                if(answers[i] == "\n" || answers[i].trim().length == 0){
                    
                    answers.splice(i,1)

                }

                


            }
            console.log(answers)
            
        };
    }

    

    if(preguntas && respuestas){

        instance.close()
        $('.test').removeClass('disappear')


    setTimeout(function(){

        next()

     },1000)

    }

    


    

     
     

}

var correcta 

var pregunta = localStorage.getItem('pregunta') ? parseInt(localStorage.getItem('pregunta')) : 0
 function next(){
    $('#correct').html('')
    $('.radio').prop('checked', false)
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

    console.log(pregunta)

    if(pregunta<answers.length){
        pregunta +=1

    
        localStorage.setItem('pregunta', pregunta)
    
        next()

    }

   

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

 function reset(){
    pregunta = 0

    localStorage.setItem('pregunta', pregunta)

    next()


 }

function goTo(){
    
    pregunta = $('#questionNumber').val()-1
    localStorage.setItem('pregunta', pregunta)

    next()
}

