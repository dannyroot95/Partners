
var config = {
    apiKey: "AIzaSyB0Q44TruQYFZ2Kz1BYapW5UB2eiAj2ZRw",
    authDomain: "gestor-de-pedidos-aukdefood.firebaseapp.com",
    databaseURL: "https://gestor-de-pedidos-aukdefood.firebaseio.com",
    projectId: "gestor-de-pedidos-aukdefood",
    storageBucket: "gestor-de-pedidos-aukdefood.appspot.com",
    messagingSenderId: "550027089460",
    appId: "1:550027089460:web:c5cbabed185feab0215c61",
    measurementId: "G-VZGVWLNCNZ"
  };
  firebase.initializeApp(config);

  let firestore = firebase.firestore();

  var positionItem = [];
  var allData = []
  var retrievedObject = localStorage.getItem('myData');
  var js = JSON.parse(retrievedObject)
  var item = 0
  var red = "img/red.png"
  var green = "img/green.png"
  var blue = "img/blue.png"
  var yellow = "img/yellow.png"

  var searchBar =  document.getElementById('searchBar');
  var searchBtn =  document.getElementById('btnSearch');
  var btnReset = document.getElementById('btnReset');
  var type =  document.getElementById('typeSelected');
  var tbody = document.getElementById('tbody1');

  var noOrders = document.getElementById("noOrdersDiv")



  getData()


 function getData(){

    var countOrders = 0 
    var totalSale = 0.00
    var myArraySales = []

    firestore.collection("orders").get().then((querySnapshot) => {
      
        querySnapshot.forEach((doc) => {
            var providerId = doc.data().items[0]["provider_id"]
            if(providerId == js["id"]){
                var client = doc.data().address["name"]
                var idOrder = doc.data().title
                var status = doc.data().status
                var totalSaleOrder = parseFloat(doc.data().total_amount)
                countOrders += 1
                if(status != "Pendiente" ){
                  totalSale = totalSale + totalSaleOrder
                  myArraySales.push(totalSaleOrder)
                }
                var typePayment = doc.data().type_payment
                AddItemsToTable(idOrder,client,status,typePayment)
                positionItem.push([doc.data(),doc.id]);   
            }
        }); 
        closeNav()

        if(countOrders <= 0){
          localStorage.setItem('myOrders', 0)
          localStorage.setItem('mySales', 0.00)
          noOrders.style = "justify-content: center;align-items: center;display: flex;padding:30px;"
        }else{
          localStorage.setItem('myOrders',countOrders)
          localStorage.setItem('mySales',totalSale)
          localStorage.setItem('mySalesArray', JSON.stringify(myArraySales));
          noOrders.remove()
        }

    }); 
 }
 

function AddItemsToTable(idOrder,client,status,typePayment){

    var tbody = document.getElementById('tbody1');
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');


    td1.innerHTML = ++item;
    td2.innerHTML = idOrder
    td3.innerHTML = client;

    td2.classList += "numberField";
    td3.classList += "clientField";

    if(status == -1){
      td4.innerHTML = '<img loading= "lazy" src="'+red+'"width="30" height="30"/>'+" "+"Cancelado";
    }else if(status == 0){
      td4.innerHTML = '<img loading= "lazy" src="'+red+'"width="30" height="30"/>'+" "+"Pendiente";
    }else if(status == 1){
      td4.innerHTML = '<img loading= "lazy" src="'+yellow+'"width="30" height="30"/>'+" "+"Procesado";
    }else if (status == 2){
      td4.innerHTML = '<img loading= "lazy" src="'+blue+'"width="30" height="30"/>'+" "+"En ruta";
    }else if(status == 3){
      td4.innerHTML = '<img loading= "lazy" src="'+green+'"width="30" height="30"/>'+" "+"Entregado";
    }else if(status == 4){
      td4.innerHTML = '<img loading= "lazy" src="'+blue+'"width="30" height="30"/>'+" "+"Enviando";
    }

    
    td5.innerHTML = typePayment;

       trow.appendChild(td1);
       trow.appendChild(td2);
       trow.appendChild(td3);
       trow.appendChild(td4);
       trow.appendChild(td5);
       
       var controlDiv = document.createElement("div");
       controlDiv.innerHTML = '<button type="button" data-toggle="modal" data-target="#exampleModalCenter" onClick = "FillBoxItem('+item+')" style="background-color:#FF3687;border-radius: 4px;color:#fff;border-color:#fff;height:30px;width:30px;margin-top:10px"><i class="bx bx-edit-alt"></i></button>'
       trow.appendChild(controlDiv);
       tbody.appendChild(trow);

  }


  
  var idProductOrder = document.getElementById('id')
  var idClient = document.getElementById('clientId')
  var idOrder = document.getElementById('titleProduct')
  var client = document.getElementById('client')
  var address = document.getElementById('address')
  var reference = document.getElementById('reference')
  var phoneClient = document.getElementById('phone')
  var typePay = document.getElementById('typePay')
  var amountToPay = document.getElementById('amountToPay')
  var payWithMoneyClient = document.getElementById('payWithMoney')
  var listProduct = document.getElementById('products')
  var imgStatus = document.getElementById('imgStatus')
  var textStatus =  document.getElementById('statusOrder')

  var btnProcess = document.getElementById('processOrder')
  var btnSend = document.getElementById('sendOrder')
  var btnComplete = document.getElementById('successOrder')




  function FillBoxItem(index){



    if(index == null){
        idOrder.value = "";
    }

    else{
        --index;


        var id = positionItem[index][1]
        var title = positionItem[index][0].title
        var name = positionItem[index][0].address.name
        var note = positionItem[index][0].address.additionalNote
        var clinetAddress = positionItem[index][0].address.address
        var latitude = positionItem[index][0].address.latitude
        var longitude = positionItem[index][0].address.longitude
        var phone = positionItem[index][0].address.mobileNumber
        var type = positionItem[index][0].type_payment
        var payWithMoney = positionItem[index][0].amount_to_pay
        var total = positionItem[index][0].total_amount
        var status = positionItem[index][0].status
        var idClientOrder = positionItem[index][0].user_id

        if(status == -1){
           imgStatus.src = red
           textStatus.innerHTML = "Cancelado"
           btnProcess.style = "display:none;"
           btnSend.style = "display:none;"
           btnComplete.style = "display:none;"
        }else if(status == 0){
           imgStatus.src = red
           textStatus.innerHTML = "Pendiente"
           btnProcess.style = "display:inline;color: #FFF;"
           btnSend.style = "display:none;"
           btnComplete.style = "display:none;"
        }else if(status == 1){
           imgStatus.src = yellow
           textStatus.innerHTML = "Procesando"
           btnProcess.style = "display:none;"
           btnSend.style = "display:inline;background-color: #154360;color: #FFF;"
           btnComplete.style = "display:none;"
        }else if (status == 2){
          imgStatus.src = blue
          textStatus.innerHTML = "En ruta"
          btnComplete.style = "display:inline;"
          btnSend.style = "display:inline;background-color: #154360;color: #FFF;"
          btnProcess.style = "display:none;"
        }else if(status == 3){
          imgStatus.src = green
          textStatus.innerHTML = "Entregado"
          btnProcess.style = "display:none;"
          btnSend.style = "display:none;"
          btnComplete.style = "display:none;"
        }else if(status == 4){
          imgStatus.src = blue
          textStatus.innerHTML = "Enviando"
          btnSend.style = "display:none;"
          btnProcess.style = "display:none;"
          btnComplete.style = "display:inline;"
        }

        initMap(latitude,longitude)
     
        if(payWithMoney != ""){
          payWithMoneyClient.innerHTML = "S/"+payWithMoney
          document.getElementById('labelPayWithMoney').style = "font-weight: bold; color: #FF3687;display:inline;"
          payWithMoneyClient.style = "display:inline;font-size:20px;"
        }else{
          document.getElementById('labelPayWithMoney').style = "display:none;"
          payWithMoneyClient.style = "display:none;"
        }

        idProductOrder.innerHTML = id
        idClient.innerHTML = idClientOrder
        idOrder.innerHTML = "Número de pedido : "+title
        client.innerHTML = name
        address.innerHTML = clinetAddress
        reference.innerHTML = note
        phoneClient.innerHTML = phone
        typePay.innerHTML = type
        amountToPay.innerHTML = "S/"+total
      
        var div = document.getElementById('divProducts')
        div.innerHTML = ""

        positionItem[index][0].items.forEach(product => {
           div = document.getElementById('divProducts')
          
          div.innerHTML = div.innerHTML + `
                          
                          <h5><img src="${product.image}" load="lazy" width="40px" height="40px">&nbsp;&nbsp;${product.title}</h5>
                          <h6>Cantidad : ${product.cart_quantity}</h6>
                          <br>
          `
        })
    }
  }


function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

function openNavUpdate() {
  document.getElementById("myNavUpdate").style.width = "100%";
}

function closeNavUpdate() {
  document.getElementById("myNavUpdate").style.width = "0%";
}


function hideModal(){
  $('#exampleModalCenter').modal('hide');
} 

function SearchTable(TypeData){
    
  var filter = searchBar.value.toUpperCase();
  var tr = tbody.getElementsByTagName("tr");
  var found;
  var count = 0

  for(let i = 0 ; i<tr.length;i++){
    var td = tr[i].getElementsByClassName(TypeData);
    for(let j = 0 ; j<td.length;j++){
      if(td[j].innerHTML.toUpperCase().indexOf(filter) > -1){
        found = true;
        count += 1
      }
    }
    if(found){
      tr[i].style.display="";
      found=false;
    }
    else{
      tr[i].style.display="none";
    }
  }


  if(count == 0){
    alertify.alert("Opps!","Sin resultados...")
    document.getElementById("searchBar").value = ""
    SearchTable("numberField");
  }
  
}

searchBtn.onclick = function(){

  if(searchBar.value == ""){
    alertify.alert("Advertencia!","Debe ingresar el # de pedido o el nombre del cliente para buscar!")
  }
  else if (type.value==1){
    SearchTable("numberField");
  }
  else if (type.value==2){
    SearchTable("clientField");
   
  }

}



btnReset.onclick = function(){
  document.getElementById("searchBar").value = ""
  SearchTable("numberField");
}


function initMap(latitude,longitude) {
  // The location of Uluru
  const uluru = { lat: latitude, lng: longitude };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 17,
    center: uluru,
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}

function procesingOrder(){

  var numOrder = document.getElementById("titleProduct").innerHTML
  var num = numOrder.replace("Número de pedido : #","Pedido%20numero%20:%20")
  

  openNavUpdate()

    var data = {status:1}

    firestore.collection("orders").doc(idProductOrder.innerHTML).update(data).then((docRef) => {


      firestore.collection("token").doc(idClient.innerHTML).get().then((docRef) => {

        var tokenUser = docRef.data().token

        fetch('https://aukde.com/notification/send_notification.php?title='+num+'&message=Se%20est%C3%A1%20procesando&token='+tokenUser)
       .then((response) => {
        console.log('Successfully sent message:', response);
             })
         .catch((error) => {
        console.log('Error sending message:', error);
        });

        document.querySelectorAll("table tbody tr").forEach(function(e){e.remove()})
        item = 0
        positionItem = [];
        getData()
        closeNavUpdate()
        hideModal()
        alertify.success('Pedido Actualizado!');
  

      }).catch((error) => {
        document.querySelectorAll("table tbody tr").forEach(function(e){e.remove()})
        item = 0
        positionItem = [];
        getData()
        closeNavUpdate()
        hideModal()
        alertify.success('Pedido Actualizado!');
        alertify.error('No se pudo notificar al usuario');
  
      });


    
    }).catch((error) => {
      closeNavUpdate()
      alertify.success('Error al actualizar pedido!');

    });
  
  }

  function sendingOrder(){

    openNavUpdate()
  
      var data 
      var text = ""

      var numOrder = document.getElementById("titleProduct").innerHTML
      var num = numOrder.replace("Número de pedido : #","Pedido%20numero%20:%20")

      if(js["delivery"] == "si"){
          data = {status:4}
          text = "Enviando"
      }else{
        data = {status:2}
        text = "En ruta"
      }
  
      firestore.collection("orders").doc(idProductOrder.innerHTML).update(data).then((docRef) => {
        

        firestore.collection("token").doc(idClient.innerHTML).get().then((docRef) => {

          var tokenUser = docRef.data().token
  
          fetch('https://aukde.com/notification/send_notification.php?title='+num+'&message=Estado%20:%20'+text+'&token='+tokenUser)
         .then((response) => {
          console.log('Successfully sent message:', response);
               })
           .catch((error) => {
          console.log('Error sending message:', error);
          });
  
          document.querySelectorAll("table tbody tr").forEach(function(e){e.remove()})
          item = 0
          positionItem = [];
          getData()
          closeNavUpdate()
          hideModal()
          alertify.success('Pedido Actualizado!');
    
  
        }).catch((error) => {
          document.querySelectorAll("table tbody tr").forEach(function(e){e.remove()})
          item = 0
          positionItem = [];
          getData()
          closeNavUpdate()
          hideModal()
          alertify.success('Pedido Actualizado!');
          alertify.error('No se pudo notificar al usuario');
    
        });


  
      }).catch((error) => {
        closeNavUpdate()
        alertify.success('Error al actualizar pedido!');
  
      });
    
    }

    function completeOrder(){

      var numOrder = document.getElementById("titleProduct").innerHTML
      var num = numOrder.replace("Número de pedido : #","Pedido%20numero%20:%20")

      openNavUpdate()
    
        var data = {status:3}
    
        firestore.collection("orders").doc(idProductOrder.innerHTML).update(data).then((docRef) => {

          firestore.collection("token").doc(idClient.innerHTML).get().then((docRef) => {

            var tokenUser = docRef.data().token
    
            fetch('https://aukde.com/notification/send_notification.php?title='+num+'&message=Su%20pedido%20ha%20sido%20entregado%20existosamente!&token='+tokenUser)
           .then((response) => {
            console.log('Successfully sent message:', response);
                 })
             .catch((error) => {
            console.log('Error sending message:', error);
            });
    
            document.querySelectorAll("table tbody tr").forEach(function(e){e.remove()})
            item = 0
            positionItem = [];
            getData()
            closeNavUpdate()
            hideModal()
            alertify.success('Pedido Actualizado!');
      
    
          }).catch((error) => {
            document.querySelectorAll("table tbody tr").forEach(function(e){e.remove()})
            item = 0
            positionItem = [];
            getData()
            closeNavUpdate()
            hideModal()
            alertify.success('Pedido Actualizado!');
            alertify.error('No se pudo notificar al usuario');
      
          });
    
        }).catch((error) => {
          closeNavUpdate()
          alertify.success('Error al actualizar pedido!');
    
        });
      
      }