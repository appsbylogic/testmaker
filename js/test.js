var lines
var answers
var respuestas
var preguntas
var instances
var instance
var modal
var modal2
var score = 0
var first = true
var skip =false;

$(document).ready(function(){
    $('.modal').modal();
    $('.collapsible').collapsible();
    
    if(localStorage.getItem('storage')){
        
        $('.mainMenu').html(localStorage.getItem('storage'))

        

    }
   
  });
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelector('.collapsible');
    instances = M.Collapsible.init(elems);
    instance = M.Collapsible.getInstance(elems);
    var elems1 = document.querySelector('#modalName');
    var instances = M.Modal.init(elems1);
    modal = M.Modal.getInstance(elems1);
    var elems2 = document.querySelector('#modalFinal');
    var instances = M.Modal.init(elems2);
    modal2 = M.Modal.getInstance(elems2);
  });


function inputRes(respuestas){

    this.respuestas = respuestas

}

function inputPreg(preguntas){

    this.preguntas = preguntas

}

var cuestionario

function submit(){

    

    

    preguntas= document.getElementById('input').files[0]
    respuestas = document.getElementById('input2').files[0]
    
    
    

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
           
            
        };
    } 

    if(preguntas && respuestas){

        
    
        modal.open()
    }
 
}

function create(){
    cuestionario = [lines,answers]


    console.log(cuestionario)

    localStorage.setItem(preguntas.name, JSON.stringify(cuestionario))


    instance.close()
    //$('.test').removeClass('disappear')

    var name = $('#testName').val()

    

    $('.tests').append('<div class="card scale-transition" ><div class="card-content">\
    <div class="row"><div class="col s12">\
    <a class="btn-floating waves-effect waves-light delete" id="back">\
    <i class="material-icons del">close</i>></a></div></div><div class="row"><br><div class="col s12"><h5 contenteditable>' + name + '</h5></div></div>\
    <div class="row"><div class="col s12">\
    <a class="btn-floating waves-effect waves-light go" id="back" onclick="next('+ "'" + document.getElementById('input').files[0].name + "'" +')"><i class="material-icons del">chevron_right</i>></a>\
    </div></div>')

    $('.tests').removeClass('disappear')

    localStorage.setItem('storage', $('.mainMenu').html())

    
    modal.close()

    
}

var correcta 

var cuestName

var pregunta = 0
 function next(name){

    first = true

    cuestName = name
     $('.mainMenu').addClass('disappear')
     $('.test').removeClass('disappear')
    $('#correct').html('')
    $('.radio').prop('checked', false)
    $('#nextQ').addClass('disabled')

    cuestionario = localStorage.getItem(name)

    lines = JSON.parse(cuestionario)[0]

    answers = JSON.parse(cuestionario)[1]

    console.log()

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

    console.log(answers.length)
    

    if(pregunta<answers.length){
        pregunta +=1

    
        localStorage.setItem('pregunta', pregunta)
    
        next(cuestName)

    }
    
    if(pregunta==answers.length){

        var total = answers.length
        console.log(score)
        if(!skip){
            $('#score').html(score+'/'+total)

        }else{

            $('#score').html('You skipped questions! You need to answer all the questions in order to get a score')

        }
        

        modal2.open()

    }

   

}

 function check(){
    console.log(correcta)
    res = $('input[name=group1]:checked').val()
    console.log(res)

    if(res == correcta&&first){
        score+=1
        
    }
    if(res == correcta){
        
        $('#correct').html('check')
        $('#nextQ').removeClass('disabled')
        
    }else{
        first=false
        $('#correct').html('close')

    }

 }

 function reset(){
    pregunta = 0
    skip =false;


    next(cuestName)


 }

function goTo(){

    skip = true
    
    pregunta = $('#questionNumber').val()-1
    

    next(cuestName)
}

function backMenu(){
    $('.mainMenu').removeClass('disappear')
     $('.test').addClass('disappear')
     skip =false;


}

$(document).on('click','.delete',function(e){
	

    console.log(e)
    
    $(e.target.parentNode.parentNode.parentNode.parentNode.parentNode).addClass('scale-transition')
	
	$(e.target.parentNode.parentNode.parentNode.parentNode.parentNode).addClass('scale-out')

	window.setTimeout(function(){
        e.target.parentNode.parentNode.parentNode.parentNode.parentNode.remove()
        
        localStorage.setItem('storage', $('.mainMenu').html())

	},400)

    



})