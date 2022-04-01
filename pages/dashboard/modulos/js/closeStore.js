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

  let userid = ""
  let firestoreData = firebase.firestore();
  var retrievedObject = localStorage.getItem('myData');
  var js = JSON.parse(retrievedObject)
  var availability = js["availability"]
  var fOpen = document.getElementById("floatOpen");
  var fClose = document.getElementById("floatClose");
  
  if(availability == "yes"){
    fOpen.style = "display:none";
    fClose.style = "display:block;color:#FFF;";

  }else{
    fClose.style = "display:none";
    fOpen.style = "display:block;background:#229954;color:#FFF;";
  }

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      userid = firebase.auth().currentUser.uid;
      }
  });  

function closeStore(){

   
  alertify.confirm("Advertencia!", "¿Desea cerrar su negocio?",
  function(){
    alertify.confirm().close(); 
    alertify.error('Tienda cerrada!');

    firestoreData.collection("products").get().then((querySnapshot) => {

        querySnapshot.forEach((doc) => {
            var ids = doc.id
            var dataid = doc.data().provider_id
            if(dataid == userid){
                firestoreData.collection("products").doc(ids).update("availability","not")
            }
            //alert(ids)s
         
        }); 
    
    }); 

    firestoreData.collection("users").doc(userid).update("availability","not")
    js["availability"] = "not"
    var json = JSON.stringify(js);
    localStorage.setItem('myData',json);

    fClose.style = "display:none"
    fOpen.style = "visibility:visible;background:#229954;color:#FFF;"

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

    firestoreData.collection("products").get().then((querySnapshot) => {

        querySnapshot.forEach((doc) => {
            var ids = doc.id
            var dataid = doc.data().provider_id
            if(dataid == userid){
                firestoreData.collection("products").doc(ids).update("availability","yes")
            }
            //alert(ids)s
         
        }); 
    }); 

    firestoreData.collection("users").doc(userid).update("availability","yes")
    js["availability"] = "yes"
    var json = JSON.stringify(js);
    localStorage.setItem('myData',json);

    fOpen.style = "display:none"
    fClose.style = "visibility:visible;color:#FFF;"


},
function(){
  alertify.error('Cancelado');
});


}


