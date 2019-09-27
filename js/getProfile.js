var signoutButton = document.getElementById('sign-out');
var userId;

function onSignIn(user){
  $("#signInBtn").css("display","none")
  $("#userImg").css("display","block")
  $("#userImgSmall").css("display","block")
  $("#sign-out").css("display","block")
  $("#mail").css("display","block")
  var profile = user.user;
  $("#userImg").attr("src", profile.photoURL);

  $("#userImgSmall").attr("src", profile.photoURL);
  $("#user").html(profile.displayName);
  $("#mail").html(profile.email);
  userId = profile.uid;

  $(".tests").html(" ");  
  readDataBase();

  
}

function onSignInCurrent(user){
  $("#signInBtn").css("display","none")
  $("#userImg").css("display","block")
  $("#userImgSmall").css("display","block")
  $("#sign-out").css("display","block")
  $("#mail").css("display","block")
  var profile = user;
  $("#userImg").attr("src", profile.photoURL);

  $("#userImgSmall").attr("src", profile.photoURL);
  $("#user").html(profile.displayName);
  $("#mail").html(profile.email);
  userId = profile.uid;

  $(".tests").html(" ");  
  readDataBase();

  
}

function signIn(){

  
  firebase.auth().signInWithRedirect(provider).then(function(result) {
    onSignIn(result)
    console.log(result)
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;

  console.log(error)
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
}

function signOut(){
  firebase.auth().signOut().then(function(user) {
    // Sign-out successful.
    $("#signInBtn").css("display","block")
    $("#userImg").css("display","none")
    $("#user").css("display","none")
    $("#userImgSmall").css("display","none")
    $("#sign-out").css("display","none")
    $("#mail").css("display","none")
    $('.tests').html(localStorage.getItem('storage'));
    location.reload();
  }).catch(function(error) {
    // An error happened.
  });
}