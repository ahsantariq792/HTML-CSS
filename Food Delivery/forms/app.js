let signupcustomer = () => {
    var name = document.getElementById('name').value
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    var country = document.getElementById('country').value
    var city = document.getElementById('city').value

    console.log(email)
    firebase.auth().createUserWithEmailAndPassword(email, password)

        .then((userCredential) => {
            var user = userCredential.user;
            uid = user.uid
            localStorage.setItem('uid', uid)

            obj = {
                'email': email,
                'name': name,
                'country': country,
                'city': city
            }
            alert('user signed')
            firebase.database().ref('customer').child(user.uid).set(obj)

            // firebase.database().ref('customer/' + user.id).set({
            //     'email': email,
            //     'name': name,
            //     'country': country,
            //     'city': city
            //   });

            setTimeout(() => {
                window.location.href = './logincustomer.html'
            }, 3000);
        })


        .catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage)
        });


}


let signuprestaurant = () => {
    var name = document.getElementById('name').value
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    var country = document.getElementById('country').value
    var city = document.getElementById('city').value

    console.log(email)
    firebase.auth().createUserWithEmailAndPassword(email, password)

        .then((userCredential) => {
            var user = userCredential.user;
            uid = user.uid
            localStorage.setItem('uid', uid)

            obj = {
                'email': email,
                'name': name,
                'country': country,
                'city': city
            }
            firebase.database().ref('Restaurants').child(user.uid).set(obj)
            // firebase.database().ref('Restaurants').child(uid).child('Dishes').push(obj)

            console.log(obj)
            alert('user signed')
            setTimeout(() => {
            window.location.href = './loginrestaurant.html'
                
            }, 3000);
        })


        .catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage)
        });


}



let signinrestaurant = () => {
    var email = document.getElementById('loginemail').value
    var password = document.getElementById('loginpassword').value


    localStorage.setItem("email", email)
    localStorage.setItem("password", password)

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            uid = user.uid
            localStorage.setItem('uid', uid)

            firebase.database().ref('Restaurants').child(uid).on('value', (data) => {
                a = data.val()

                localStorage.setItem('email', a.email)
                localStorage.setItem('restaurant', a.restaurant)
                localStorage.setItem('city', a.city)
                localStorage.setItem('country', a.country)
                localStorage.setItem('uid', uid)
            })
            setTimeout(() => {
                window.location.href = '../restaurant/dashboard.html'
            }, 3000)
        })
        .catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage)
        });
}

let signincustomer = () => {
    var email = document.getElementById('loginemail').value
    var password = document.getElementById('loginpassword').value


    localStorage.setItem("email", email)
    localStorage.setItem("password", password)

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            uid = user.uid
            firebase.database().ref('customer').child(uid).on('value', (data) => {
                a = data.val()

                localStorage.setItem('email', a.email)
                localStorage.setItem('restaurant', a.restaurant)
                localStorage.setItem('city', a.city)
                localStorage.setItem('country', a.country)
                localStorage.setItem('uid', uid)
            })
            setTimeout(() => {
                window.location.href = '../customer/dashboard.html'
            }, 3000)
        })
        .catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage)
        });
}