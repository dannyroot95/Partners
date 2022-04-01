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

var retrievedObject = localStorage.getItem('myData');
var js = JSON.parse(retrievedObject)

let userid = ""
var fOpen = document.getElementById("floatOpen");
var fClose = document.getElementById("floatClose");
var availability = js["availability"]

document.getElementById("email").innerHTML = js["email"]
document.getElementById("name").value = js["firstName"]
document.getElementById("lastname").value = js["lastName"]
document.getElementById("codeClient").value = js["code_client"]
document.getElementById("nameStore").value = js["name_store"]
document.getElementById("address").value = js["address"]
document.getElementById("phone").value = js["mobile"]
document.getElementById("timestamp").value = new Date(js["timestamp"])
document.getElementById("typePackage").value = js["type_package"]
document.getElementById("dni").value = js["dni"]
document.getElementById("ruc").value = js["ruc"]
document.getElementById("priceDelivery").value = js["price_delivery"]

if(js[Image] != null){
    document.getElementById("myPicture").src = js["image"]

}else{
    document.getElementById("myPicture").src = "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"

}

if(js["gender"] == "Masculino"){
  document.getElementById("spanMasculino").style = "background-color:black;color:#fff"
}else{
    document.getElementById("spanMasculino").style = "background-color:#FF3687;color:#fff"
}


if(availability == "yes"){
  fOpen.style = "display:none";
  fClose.style = "display:block";

}else{
  fClose.style = "display:none";
  fOpen.style = "display:block;background:#229954";
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    userid = firebase.auth().currentUser.uid;
    }
});  


function updateData(){

 openNav()

 
var name = document.getElementById("name").value 
var lastName = document.getElementById("lastname").value 
var store = document.getElementById("nameStore").value
var address = document.getElementById("address").value 
var mobile = document.getElementById("phone").value
var dni = document.getElementById("dni").value 
var ruc = document.getElementById("ruc").value
var priceDelivery = document.getElementById("priceDelivery").value 

   if(name != "" && lastName != "" && store != ""  && address != "" && mobile != "" && dni != "" && ruc != "" && priceDelivery !=""){

    var data = {firstName : name , lastName:lastName , name_store:store , address:address , mobile : mobile , dni:dni , ruc:ruc , price_delivery : priceDelivery}
   
    firestore.collection("users").doc(js["id"]).update(data).then((docRef) => {

        firestore.collection("users").doc(js["id"]).get().then((querySnapshot) => {
            if(querySnapshot.exists){
                closeNav()
                alertify.success('Datos guardados!');
                localStorage.setItem('myData', JSON.stringify(querySnapshot.data()));
            }
        }).catch((error) => {
            closeNav()
            alertify.error('Error!');
          });

    }).catch((error) => {
  closeNav()
  alertify.error('Error!');
});


   }else{
       alertify.alert("Alerta!",'Los campos no deben estar vacíos!');
       closeNav() 
   }


}


function openNav() {
    document.getElementById("myNav").style.width = "100%";
  }
  
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }
  

  function closeStore(){

    alertify.confirm("Advertencia!", "¿Desea cerrar su negocio?",
    function(){
      alertify.confirm().close(); 
      alertify.error('Tienda cerrada!');

    firestore.collection("products").get().then((querySnapshot) => {

        querySnapshot.forEach((doc) => {
            var ids = doc.id
            var dataid = doc.data().provider_id
            if(dataid == userid){
              firestore.collection("products").doc(ids).update("availability","not")
            }
            //alert(ids)s
         
        }); 
    
    }); 

    firestore.collection("users").doc(userid).update("availability","not")
    js["availability"] = "not"
    var json = JSON.stringify(js);
    localStorage.setItem('myData',json);

    fClose.style = "display:none"
    fOpen.style = "visibility:visible;background:#229954"

  },
  function(){
    alertify.success('Cancelado');
  });

}

function openStore(){

  alertify.confirm("Advertencia!", "¿Desea abrir su negocio?",
  function(){
  alertify.confirm().close(); 
  alertify.success('Tienda abierta!');

  firestore.collection("products").get().then((querySnapshot) => {

        querySnapshot.forEach((doc) => {
            var ids = doc.id
            var dataid = doc.data().provider_id
            if(dataid == userid){
              firestore.collection("products").doc(ids).update("availability","yes")
            }
            //alert(ids)s
         
        }); 
    }); 

    firestore.collection("users").doc(userid).update("availability","yes")
    js["availability"] = "yes"
    var json = JSON.stringify(js);
    localStorage.setItem('myData',json);

    fOpen.style = "display:none"
    fClose.style = "visibility:visible"

  },
  function(){
    alertify.error('Cancelado');
  });  

}

