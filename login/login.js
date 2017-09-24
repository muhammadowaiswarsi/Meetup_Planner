var database = firebase.database().ref("/");
var auth = firebase.auth();

var email = document.getElementById("email");
var password = document.getElementById("password");

document.getElementById("stop").addEventListener("submit", function (event) {
    event.preventDefault()
    var user = {
        email: email.value,
        password: password.value,
    }

    auth.signInWithEmailAndPassword(user.email, user.password)
        .then(function (response) {
            database.child("users/" + response.uid).once("value", function (snapshot) {
                var convert = JSON.stringify(snapshot.val())
                localStorage.setItem("loggedInUser", convert)
                location = "../home/home.html"
            })
                .catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === 'auth/wrong-password') {
                        alert('Wrong password.');
                    } else {
                        alert(errorMessage);
                    }
                    console.log(error);
                });

        });

});