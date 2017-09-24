var database = firebase.database().ref("/");
var auth = firebase.auth();

var firstName = document.getElementById("firstname");
var lastName = document.getElementById("lastname");
var email = document.getElementById("email");
var password = document.getElementById("password");
var address = document.getElementById("address");
var country = document.getElementById("country");
var city = document.getElementById("city");

function submit() {
    var user = {
        firstName: firstName.value,
        lastName: lastName.value,
        username : firstName.value + " " + lastName.value,
        email: email.value,
        password: password.value,
        address: address.value,
        country: country.value,
        city: city.value
    }

    auth.createUserWithEmailAndPassword(user.email, user.password)
    .then(function (response) {
            database.child('users/' + response.uid).set(user)
                .then(function () {
                    location = 'login/login.html'
                })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });


});
}



