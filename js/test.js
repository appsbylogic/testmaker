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
    $('select').formSelect();

  });

  $(document).ready(function(){
    $('.sidenav').sidenav();
   
    
  });
        
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelector('.collapsible');
    instances = M.Collapsible.init(elems);
   
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

$("#input:file").on("change",function (e){
    var fileName 

    console.log(e)
    try{

        fileName = e.target.files[0].name;

        $("#fileQuestName").html( fileName);
  
    }catch{
        $("#fileQuestName").html('<i class="material-icons right">file_upload</i>Question File');
    }


      

       

    
    
});

$("#input2:file").change(function (e){
    var fileName

    try{
        fileName = e.target.files[0].name;

        $("#fileAnsName").html( fileName);

    }catch{
        $("#fileAnsName").html('<i class="material-icons right">file_upload</i>Answer file');
    }
    
    
  });


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

        
        $("#fileQuestName").html('<i class="material-icons right">file_upload</i>Question File');
        $("#input:file").val('')
        $("#fileAnsName").html('<i class="material-icons right">file_upload</i>Answer file');
        $("#input2:file").val('')
    }
 
}
$("select.storageSelect").on('change', function(){

   console.log('asdasdasd')

   if($("select.storageSelect").val()==1){
    $(".cloudTest").css("display","block")

  

    if(userId==undefined){
        
        $(".cloudTest").html("<blockquote><a data-target='mobile-demo' class='sidenav-trigger teal-text'><b>Sign in</b></a>  to save your tests in the cloud</blockquote>")

    }
    if($(".cloudTest").html().replace(/\s/g, '')==''){
        $(".cloudTest").html('<blockquote id="noTestMsg2">There are no saved tests</blockquote>');
    }
    $(".localTest").css("display","none")
   }else{
    $(".cloudTest").css("display","none")

    if($(".localTest").html().replace(/\s/g, '')==''){
        $(".cloudTest").html('<blockquote id="noTestMsg2">There are no saved tests</blockquote>');
    }
    $(".localTest").css("display","block")
   }
    

});



function create(){
    cuestionario = [lines,answers]


    console.log(cuestionario)

   

    //$('.test').removeClass('disappear')

    var name = $('#testName').val()

    if(userId !=undefined){
        writeUsertest(JSON.stringify(cuestionario),userId,name)
    }
   
    

        $('.cloudTest').html("<blockquote id='noTestMsg2'>Loading...</blockquote>");

        if(userId != undefined){
            updateDataBase();
        }

        

 
        $('.localTest').append(`
         
                
        <div class="card">
        <a href="#" class="btn-flat left  delete" onclick="deleteTest('`+name+`')" id="back"><i class="material-icons grey-text del">close</i></a>
        <a href="#" onclick="getTest('` + name + `')" class="topic black-text">
            <div class="card-content" id="cardPyth" >
    
            <br>
            <h5>` + name + `<i class="material-icons right">chevron_right</i></h5>
    
            </div>
        </a>
    
        </div>
    
    `)
    localStorage.setItem(name, JSON.stringify(cuestionario))
        localStorage.setItem('storage', $('.localTest').html())

    

    
    modal.close()

    
}

var correcta 

var cuestName

var pregunta = 0

function getTestCloud(name){
    
 
    readDataBaseQuestions(name)

}

function getTest(name){

    cuestionario = localStorage.getItem(name)

    readJson(cuestionario)
}

 function next(){

    first = true
  
     $('.mainMenu').addClass('disappear')
     $('.test').removeClass('disappear')
    $('#correct').html('')
    $('.radio').prop('checked', false)
    $('#nextQ').addClass('disabled')
 

    
    $(".maxQuestions").html(pregunta+1 + " / " + answers.length)
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

 function readJson(cuestionario){
    lines = JSON.parse(cuestionario)[0]

    answers = JSON.parse(cuestionario)[1]

    next()
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
    if($('#questionNumber').val()-1<answers.length){
        pregunta = $('#questionNumber').val()-1
    

        next(cuestName)
    }
   
}

function backMenu(){
    $('.mainMenu').removeClass('disappear')
     $('.test').addClass('disappear')
     skip =false;


}
var nameDelete

function deleteTest(name){
    nameDelete = name
}

$(document).on('click','.delete',function(e){
    console.log(nameDelete)

   
    
    $(e.target.parentNode.parentNode).addClass('scale-transition')
	
	$(e.target.parentNode.parentNode).addClass('scale-out')

	window.setTimeout(function(){
        e.target.parentNode.parentNode.remove()

        localStorage.setItem('storage', $('.localTest').html())
        return firebase.database().ref('users/' + userId + '/').child(nameDelete).remove();
           


	},400)

    



})



function writeUsertest(test,userid,name) {
    firebase.database().ref('users/' + userid + '/' + name).set({
        
      test: test
      //some more user data
    });
  
  
  }

 
  function readDataBase(){
   
    var leadsRef = defaultDatabase.ref('users/' + userId);
    $('#noTestMsg2').remove();
    leadsRef.once('value', function(snapshot) {
       
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot;
          console.log(snapshot)
         
          $('.cloudTest').append(`
         
                
                <div class="card">
                <a href="#" class="btn-flat left  delete" onclick="deleteTest('`+childSnapshot.key+`')" id="back"><i class="material-icons grey-text del">close</i></a>
                <a href="#" onclick="getTestCloud('` + childSnapshot.key + `')" class="topic black-text">
                    <div class="card-content" id="cardPyth" >
            
                    <br>
                    <h5>` + childSnapshot.key + `<i class="material-icons right">chevron_right</i></h5>

                    </div>
                </a>

                </div>

            `)

        });
    });
  }

  function updateDataBase(){
    $('#noTestMsg2').remove();
    $('.testDiv').removeClass('disappear')
    var leadsRef = defaultDatabase.ref('users/' + userId);
    return leadsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot;
          console.log(snapshot)
       
          $('.cloudTest').append(`
         
                
                <div class="card">
                <a href="#" class="btn-flat left  delete" onclick="deleteTest('`+childSnapshot.key+`')" id="back"><i class="material-icons grey-text del">close</i></a>
                <a href="#" onclick="getTestCloud('` + childSnapshot.key + `')" class="topic black-text">
                    <div class="card-content" id="cardPyth" >
            
                    <br>
                    <h5>` + childSnapshot.key + `<i class="material-icons right">chevron_right</i></h5>

                    </div>
                </a>

                </div>

            `)

        });
    });
  }

  function readDataBaseQuestions(name){
    var childData
    var leadsRef = defaultDatabase.ref('users/' + userId + "/" + name);
    leadsRef.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
           cuestionario = childSnapshot.val();
            readJson(cuestionario);
           return cuestionario

        });
    });
    
  }