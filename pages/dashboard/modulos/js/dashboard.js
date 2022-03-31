function toDataURL(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}

let img = "https://firebasestorage.googleapis.com/v0/b/gestor-de-pedidos-aukdefood.appspot.com/o/Product_Image1642179710049.jpg?alt=media&token=8ecad99b-f808-4002-a364-e90b32faa820"
let result = img.replace("https", "http");

toDataURL(result, function(dataUrl) {
  console.log(dataUrl)
})


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
var countProducts = 0
var countOrders = 0 
var totalSale = 0.00
var myArraySales = []
firestore.collection("products").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var providerId = doc.data().provider_id
            if(providerId == js["id"]){
                countProducts += 1
            }
        }); 


        if(countOrders<=0){localStorage.setItem('totalProducts', 0);}else{localStorage.setItem('totalProducts', countProducts);}

        firestore.collection("orders").get().then((querySnapshot) => {
      
          querySnapshot.forEach((doc) => {
              var providerId = doc.data().items[0]["provider_id"]
              if(providerId == js["id"]){
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
          if(countOrders <= 0){
            localStorage.setItem('myOrders', 0)
            localStorage.setItem('mySales', 0.00)
          }else{
            localStorage.setItem('myOrders',countOrders)
            localStorage.setItem('mySales',totalSale)
            localStorage.setItem('mySalesArray', JSON.stringify(myArraySales));
            noOrders.remove()
          }
      }); 
 
    }); 