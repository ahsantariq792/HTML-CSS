async function add() {
    name = document.getElementById('name').value
    price = document.getElementById('price').value
    deliveryType = document.getElementById('deliveryType').value
    image = document.getElementById('image').files[0]
    category = document.getElementById('categories').value

    x = firebase.storage().ref().child("images/" + name)
    await x.put(image)
    let url = await x.getDownloadURL()

    obj = {
        'name': name,
        'price': price,
        'deliveryType': deliveryType,
        'category': category,
        'dishImage': url
    }
    console.log(obj)
    uid = localStorage.getItem('uid')
    firebase.database().ref('Restaurants').child(uid).child('Dishes').push(obj)
    setTimeout(() => {
        window.location.href = './dashboard.html'
    }, 1000)
}



function deleteItem(a) {
    let uid = localStorage.getItem('uid')
    firebase.database().ref('Restaurants').child(uid).child('Dishes').child(a).remove()
    location.reload()
}


function dish() {
    if (localStorage.getItem('uid')) {
        uid = localStorage.getItem('uid')
        firebase.database().ref('Restaurants').child(uid).child('Dishes').on('value', (data) => {
            a = data.val()
            for (var key in a) {
                x = a[key]
                console.log(x.dishImage)
                document.getElementById('dashboard').innerHTML += `    
                    <div class="card" style="width: 19rem; height: 22rem">
                    <img src="${x.dishImage}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title"> ${x.name}</h5>
                            <p class="card-text">RS ${x.price}</p>
                            
                            <button onclick='deleteItem("${key}")'>delete</button>
                        </div>
                    </div>
        
        `
            }
        })
    }
}

function deleteItem(a) {
    let uid = localStorage.getItem('uid')
    firebase.database().ref('Restaurants').child(uid).child('Dishes').child(a).remove()
    location.reload()
}

dish()