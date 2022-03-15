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

  var searchBar =  document.getElementById('searchBar');
  var searchBtn =  document.getElementById('btnSearch');
  var btnReset = document.getElementById('btnReset');
  var type =  document.getElementById('typeSelected');
  var tbody = document.getElementById('tbody1');


  document.getElementById("spanSku").innerHTML = js["sku"]
  document.getElementById("spanSkuAdd").innerHTML = js["sku"]

  var noProduct =  document.getElementById("noProductDiv")

  //agregar tipo de producto en el object
  // agregar item fecha en la tabla

  var products = localStorage.getItem('myProducts');
  var myParseProducts = JSON.parse(products)
  console.log(myParseProducts)

  if(myParseProducts != null){
     if(myParseProducts <= 0){
        noProduct.style = "justify-content: center;align-items: center;display: flex;padding:30px;"
        getData()
     }
     else{
       noProduct.remove()
       retrieveLocalData(myParseProducts)
     }
  }else{
     getData()
  }

  function retrieveLocalData(myParseProducts){
    for(var i = 0 ; i< myParseProducts.length ; i++){
      // AddItemsToTable(myParseProducts[i][0],myParseProducts[i][1],myParseProducts[i][2],myParseImages[i])
        AddItemsToTable(myParseProducts[i][0]["title"],myParseProducts[i][0]["sku"],myParseProducts[i][0]["stock_quantity"],myParseProducts[i][0]["image"])
      }
     //getDataRealTime()  
  }

 function getData(){

  var positionItem = [];
  var countProducts = 0
  
    firestore.collection("products").get().then((querySnapshot) => {

        querySnapshot.forEach((doc) => {
            var providerId = doc.data().provider_id
            if(providerId == js["id"]){
                countProducts += 1
                var image = doc.data().image
                var nameProduct = doc.data().title
                var sku = doc.data().sku
                var stock = doc.data().stock_quantity
                AddItemsToTable(nameProduct,sku,stock,image)
                positionItem.push([doc.data(),doc.id]);
               
            }
        }); 
        localStorage.setItem('myProducts', JSON.stringify(positionItem));
        localStorage.setItem('totalProducts', countProducts);
    }); 
    
 }

 function getDataRealTime(){

    positionItem = [];
    firestore.collection("products").onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var providerId = doc.data().provider_id
            if(providerId == js["id"]){
                positionItem.push([doc.data(),doc.id]);
            }
        }); 
        localStorage.setItem('myProducts', JSON.stringify(positionItem));
    }); 
    
 }



function AddItemsToTable(product,sku,stock,image){

    var tbody = document.getElementById('tbody1');
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');

    td1.innerHTML = ++item;
    td2.innerHTML = '<img loading= "lazy" src="'+image+'"width="40" height="40"/>'
    td3.innerHTML = product;
    td4.innerHTML = sku;
    td5.innerHTML = stock;

    td3.classList += "nameField";
    td4.classList += "skuField";


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


  var idProduct = document.getElementById('id')
  var modName = document.getElementById('titleProduct')
  var nameProduct = document.getElementById('name')
  var imageProduct = document.getElementById('myImgProduct')
  var skuProduct = document.getElementById('sku')
  var priceProduct = document.getElementById('price')
  var descriptionProduct = document.getElementById('description')
  var deliveryProduct = document.getElementById('delivery')
  var stockProduct = document.getElementById('stock')



  function FillBoxItem(index){

    var products = localStorage.getItem('myProducts');
    var myParseProduct = JSON.parse(products)

    if(index==null){
        modName.value = "";
    }

    else{
        --index;
        var id = myParseProduct[index][1]
        var name = myParseProduct[index][0]["title"]
        var image = myParseProduct[index][0]["image"]
        var sku = myParseProduct[index][0]["sku"]
        sku = sku.replace(js["sku"],"")
        var price = myParseProduct[index][0]["price"]
        var description = myParseProduct[index][0]["description"]
        var delivery = myParseProduct[index][0]["price_delivery"]
        var stock = myParseProduct[index][0]["stock_quantity"]

        idProduct.innerHTML = id
        nameProduct.value = name
        modName.innerHTML = name
        imageProduct.src = image
        skuProduct.value = sku
        priceProduct.value = price
        descriptionProduct.value = description
        deliveryProduct.value = delivery
        stockProduct.value = stock
       
    }


  }




function updateData(){
  openNav()

  var nameProduct = document.getElementById('name').value
  var skuProduct = document.getElementById('sku').value
  var priceProduct = document.getElementById('price').value
  var descriptionProduct = document.getElementById('description').value
  var deliveryProduct = document.getElementById('delivery').value
  var stockProduct = document.getElementById('stock').value
  var idProduct = document.getElementById('id').innerHTML

  var dataObject = {title:nameProduct,sku:js["sku"]+skuProduct,price:priceProduct,description:descriptionProduct,price_delivery:deliveryProduct,stock_quantity:stockProduct}
  
  firestore.collection("products").doc(idProduct).update(dataObject).then((docRef) => {
    document.getElementById("textupdate").innerHTML = "Actualizado!"
    document.querySelectorAll("table tbody tr").forEach(function(e){e.remove()})
    item = 0
    getData()
    closeNav()
    alertify.success('Producto Actualizado!');
    hideModal()
})
.catch((error) => {
  document.getElementById("textupdate").innerHTML = "Error"
  closeNav()
  alertify.success('Error!');
});
}

function deleteProduct(){

  var idProduct = document.getElementById('id').innerHTML

  alertify.confirm("Advertencia!", "¿Desea borrar realmente este producto?",
  function(){
    alertify.confirm().close(); 
    alertify.message('Espere un momento...');
    document.getElementById("textupdate").innerHTML = "Borrando producto..."
    openNav()
    firestore.collection("products").doc(idProduct).delete().then(() => {
      document.getElementById("textupdate").innerHTML = "Borrado!"
      document.querySelectorAll("table tbody tr").forEach(function(e){e.remove()})
      item = 0
      getData()
      closeNav()
      alertify.success('Producto Borrado!');
      hideModal()
      console.log("Borrado!");
  
  
  }).catch((error) => {
      
    document.getElementById("textupdate").innerHTML = "Error"
    closeNav()
    alertify.success('Error!');
  
  });
  },
  function(){
    alertify.error('Cancelado');
  })
  ;

  

}

function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

function openNavCreate() {
  document.getElementById("myNavCreate").style.width = "100%";
}

function closeNavCreate() {
  document.getElementById("myNavCreate").style.width = "0%";
}


function hideModal(){
  $('#exampleModalCenter').modal('hide');
} 
function hideModalCreate(){
  $('#modalAddProduct').modal('hide');
} 

function showModalAddProduct(){

 document.getElementById('nameUp').value = ""
 document.getElementById('skuUp').value = ""
 document.getElementById('priceUp').value = ""
 document.getElementById('descriptionUp').value = ""
 document.getElementById('deliveryUp').value = ""
 document.getElementById('stockUp').value = ""
 document.getElementById("files").value = null
 document.getElementById("myImgAddProduct").src = "img/ico_product.png"

  
  $('#modalAddProduct').modal('show')

}


function uploadImage(){

  var nameProduct = document.getElementById('nameUp').value
  var skuProduct = document.getElementById('skuUp').value
  var priceProduct = document.getElementById('priceUp').value
  var descriptionProduct = document.getElementById('descriptionUp').value
  var deliveryProduct = document.getElementById('deliveryUp').value
  var stockProduct = document.getElementById('stockUp').value
  var file=document.getElementById("files").files[0];
  
  if(file != null){
    if(nameProduct != "" && skuProduct != "" && priceProduct != "" && descriptionProduct != "" && deliveryProduct != "" && stockProduct != ""){
      openNavCreate()
      var storage = firebase.storage();
      var storageref=storage.ref();
      var thisref=storageref.child("Provider-Products").child(file.name).put(file);
      thisref.on('state_changed',function(snapshot) {
      }, function(error) {
        document.getElementById("textcreate").innerHTML = "Error"
        closeNavCreate()
        alertify.error('Error al subir imagen!');
     }, function() {
      // Uploaded completed successfully, now we can get the download URL
      thisref.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        saveProduct(downloadURL);
       });
      });
    }
    else{
      alertify.alert("Alerta!","Complete todos los campos")
    }
  }else{
    alertify.alert("Hey!","Debe subir una foto del producto!")
  }

  

 
}


// Save message to firebase database
function saveProduct(url){

  var nameProduct = document.getElementById('nameUp').value
  var skuProduct = document.getElementById('skuUp').value
  var priceProduct = document.getElementById('priceUp').value
  var descriptionProduct = document.getElementById('descriptionUp').value
  var deliveryProduct = document.getElementById('deliveryUp').value
  var stockProduct = document.getElementById('stockUp').value

  var closingTime = js["closing_time"]
  var daysData = js["days"]
  var myDelivery = js["delivery"]
  var hoursData = js["hours"]
  var nameStore = js["name_store"]
  var openingHours = js["opening_hours"]
  var productId = ""
  var providerId = js["id"]
  var userId = js["id"]
  var userName = js["firstName"]
  var typeProduct = js["type_product"]
  var mySku = js["sku"]

  var dataObject = {opening_hours:openingHours,days:daysData,delivery:myDelivery,
    hours:hoursData,name_store:nameStore,closing_time:closingTime,
    product_id:productId,provider_id:providerId,user_id:userId,
    user_name:userName,title:nameProduct,sku:mySku+skuProduct,price:priceProduct,
    description:descriptionProduct,price_delivery:deliveryProduct,stock_quantity:stockProduct,image:url,type_product:typeProduct}


firestore.collection("products").add(dataObject)
.then((docRef) => {
  document.getElementById("textupdate").innerHTML = "Producto Subido!"
    document.querySelectorAll("table tbody tr").forEach(function(e){e.remove()})
    item = 0
    getData()
    closeNavCreate()
    alertify.success('Producto Subido!');
    hideModalCreate()
})
.catch((error) => {
  document.getElementById("textcreate").innerHTML = "Error"
  closeNavCreate()
  alertify.error('Error al subir producto!');
});

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
    SearchTable("nameField");
  }
  
}

searchBtn.onclick = function(){

  if(searchBar.value == ""){
    alertify.alert("Advertencia!","Debe ingresar el SKU o Nombre de producto para buscar!")
  }
  else if (type.value==1){
    SearchTable("nameField");
  }
  else if (type.value==2){
    SearchTable("skuField");
   
  }

}



btnReset.onclick = function(){
  document.getElementById("searchBar").value = ""
  SearchTable("nameField");
}



function init() {
  var inputFile = document.getElementById('files');
  inputFile.addEventListener('change', showImage, false);
}

function showImage(event) {
  var file = event.target.files[0];
  var reader = new FileReader();
  reader.onload = function(event) {
    var img = document.getElementById('myImgAddProduct');
    img.src= event.target.result;
  }
  reader.readAsDataURL(file);
}
window.addEventListener('load', init, false);