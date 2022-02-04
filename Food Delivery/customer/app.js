function dashboard() {
    // if (localStorage.getItem('uid')) {
    // uid = localStorage.getItem('uid')
    firebase.database().ref('Restaurants').on('value', (data) => {
        a = data.val()
        for (var key in a) {
            x = a[key]
            console.log(key)
            document.getElementById('dashboard').innerHTML += `    
                    <div class="card" style="width: 19rem; height: 22rem">
                    <img src="https://www.haveli.com.pk/wp-content/uploads/2019/08/26.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title"> ${x.name}</h5>
                            <p class="card-text text">${x.city}</p>
                            <button class="btn btn-primary" onclick='show("${key}")'>Visit</button>
                        </div>
                    </div>
        
        `
        }
    })
    // }
}


function show(resUid) {
    document.getElementById('dashboard').innerHTML = ""    
    firebase.database().ref('Restaurants').child(resUid).child('Dishes').on('value', (data) => {
        a = data.val()
        for (var key in a) {
            x = a[key]
            console.log(key)
            console.log(x.dishImage)
            document.getElementById('dashboard').innerHTML += `    
            <div class="card" style="width: 18rem;">
            <img src= "${x.dishImage}" class="card-img-top"alt="..." id="foodImg">
            <div class="card-body">
                <h2 class="card-title">${x.name}</h2>
                <h4 class="card-text">Price : ${x.price}</h4>
                <h4 class="card-text">Delivery : ${x.deliveryType}</h4>
                <button class="btn btn-primary" onclick='order("${resUid}","${key}")' class='btn'>Order</button>
            </div>
        </div>`


        }
    })
}


function order(resUid, dishUid){
    userUid = localStorage.getItem('uid')
    customerName = localStorage.getItem('customer')
    firebase.database().ref('Restaurants').child(resUid).child('Dishes').child(dishUid).on('value', (data) => {
        order = data.val()
        order.status = 'Pending'
        order.resUid = resUid
        order.customerName = customerName
        order.cutomerUid = userUid
        firebase.database().ref('Orders').push(order)
    })
    alert('Order Placed')
}

function cart(){
    // if (localStorage.getItem('uid')) {
    //     userUid = localStorage.getItem('uid')
        firebase.database().ref('Orders').on('value', (data) => {
            a = data.val()
            for (var key in a) {
                x = a[key]
                console.log(x)
                if (x.status === 'Delivered') {
                    document.getElementById('orderList').innerHTML += `    
                    <div class="card" style="width: 18rem;">
                        <img src= "${x.dishImage}" class="card-img-top"alt="..." id="foodImg">
                        <div class="card-body">
                            <h2 class="card-title">${x.name}</h2>
                            <h4 class="card-text">Price : ${x.price}</h4>
                            <h4 class="card-text">Delivery : ${x.deliveryType}</h4>
                            <h4 class="card-text">Delivery : ${x.status}</h4>
                            <p>Delivered Order cannot be cancelled</p>
                    
                         </div>
                    </div>`
                }

                else {
                    document.getElementById('pen').innerHTML += `
                    <div class="card" style="width: 18rem;">
                        <img src= "${x.dishImage}" class="card-img-top"alt="..." id="foodImg">
                        <div class="card-body">
                            <h2 class="card-title">${x.name}</h2>
                            <h4 class="card-text">Price : ${x.price}</h4>
                            <h4 class="card-text">Delivery : ${x.deliveryType}</h4>
                            <h4 class="card-text">Delivery : ${x.status}</h4>
                            <button class="btn btn-danger" onclick="cancelOrder('${key}')">Cancel</button>
                        </div>
                    </div>`
                }
            }
        })
    // }
}

function cancelOrder(a) {
    userUid = localStorage.getItem('uid')
    firebase.database().ref('Orders').child(a).remove()
    location.reload()
}