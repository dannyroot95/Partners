var key = localStorage.getItem("system");
if(key != null){
  window.open("../pages/dashboard/index.html", "_self");
}

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


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var user = firebase.auth().currentUser;
    var key = localStorage.getItem("system");
    if(user != null && key !=null){
      //window.open("../pages/dashboard.html", "_self");
    }

  } else {
    var key = localStorage.getItem("system");
    localStorage.removeItem("system");
    //window.open("../pages/sign-in.html", "_self");
  }
});

// empty - > for collection
// exist -> for document

let firestore = firebase.firestore();

function logout(){
    var key = localStorage.getItem("system");
    localStorage.removeItem(key);
    firebase.auth().signOut();
  }

function login(){
  var countProducts = 0
  var countOrders = 0 
  var totalSale = 0.00
  var myArraySales = []

  document.getElementById("btn-login").disabled = true;
  spinner();
  var userEmail = document.getElementById("email").value;
  var userPass = document.getElementById("password").value;

  if(userEmail != "" && userPass !=""){
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then((userCredential) => {
        var user = firebase.auth().currentUser.uid

        firestore.collection("users").doc(user).get().then((querySnapshot) => {
            if(querySnapshot.exists){
              var typeUser = querySnapshot.data().type_user
              var namestore = querySnapshot.data().name_store
              localStorage.setItem('myData', JSON.stringify(querySnapshot.data()));
                if(typeUser == "provider"){
                    if (window.sessionStorage) {
                       var newItems = [];
                       firestore.collection("products").get().then((querySnapshot) => {
                       querySnapshot.forEach((doc) => {
                       var providerId = doc.data().provider_id
                        if(providerId == user){
                          countProducts += 1
                          newItems.push([doc.data(),doc.id])
                }
             }); 

        

        firestore.collection("orders").get().then((querySnapshot) => {
      
          querySnapshot.forEach((doc) => {
              var providerId = doc.data().items[0]["provider_id"]
              if(providerId == user){
                  var status = doc.data().status
                  var totalSaleOrder = parseFloat(doc.data().total_amount)
                  countOrders += 1
                  if(status != "Pendiente" ){
                    totalSale = totalSale + totalSaleOrder
                    myArraySales.push(totalSaleOrder)
                  }   
              }
          }); 
  
          if(countOrders <= 0){
            localStorage.setItem('myOrders', 0)
            localStorage.setItem('mySales', 0.00)
          }else{
            localStorage.setItem('myOrders',countOrders)
            localStorage.setItem('mySales',totalSale)
            localStorage.setItem('mySalesArray', JSON.stringify(myArraySales));
          }

        localStorage.setItem('myProducts', JSON.stringify(newItems));
        localStorage.setItem('totalProducts', countProducts);
        spinner();
        localStorage.setItem("system", "mySession");
        localStorage.setItem("username",namestore)
        window.open("../pages/dashboard/index.html", "_self");


  
      }); 
        
    }); 
      
                }
                else
                 {
                  logout()
                  document.getElementById("btn-login").disabled = false;
                  spinner();
                  throw new Error('Tu Browser no soporta cache!');
                }
              }else{
                logout()
                spinner();
                alertify.alert("Advertencia!","Usuario no permitido!")
              }
            }
        });   
        // ...
      })
      .catch((error) => {
        document.getElementById("btn-login").disabled = false;
        spinner();
        var errorCode = error.code;
        var errorMessage = error.message;
        alertify.alert("Advertencia!","Código de error : "+errorCode+" "+errorMessage)
      });
  }else{
    document.getElementById("btn-login").disabled = false;
    spinner();
    alertify.alert("Advertencia!","Complete los campos")
  }

  

}

function spinner(){
  var x = document.getElementById("div-loader");
  if (x.style.display === "none") {
    x.style.display = "inline";
  } else {
    x.style.display = "none";
  }
}

function showModal(){

  $(".modal").on("hidden.bs.modal", function(){
    $(".modal-body1").html("");
});

  $(function(){
    $('.trigger-btn').trigger('click');
});
}


