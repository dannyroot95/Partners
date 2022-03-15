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

var inputCheckYes = document.getElementById("checkyes")
var inputCheckNot = document.getElementById("checknot")
var priceDelivery = document.getElementById("inputDelivery")
var priceShipping = document.getElementById("priceDelivery")
var firstname = document.getElementById("name")
var lastname = document.getElementById("lastname")
var dni = document.getElementById("dni")
var phone = document.getElementById("phone")
var namestore = document.getElementById("namestore")
var address = document.getElementById("address")
var latitude = document.getElementById("latitude")
var longitude = document.getElementById("longitude")
var ruc = document.getElementById("ruc")
var mail = document.getElementById("mail")
var password = document.getElementById("password")

var checkMale = document.getElementById("option-1")
var checkFemale = document.getElementById("option-2")
var checkyes = document.getElementById("checkyes")
var checkNot = document.getElementById("checknot")

var gender = ""
var hasDelivery = ""
var typeProduct = ""

checkMale.addEventListener('click',function(){
    if(checkMale.checked){
        gender = "Masculino"
    }
})

checkFemale.addEventListener('click',function(){
    if(checkFemale.checked){
        gender = "Femenino"
    }
})

inputCheckYes.addEventListener('change', function() {
    if (inputCheckYes.checked) {
         hasDelivery = "si"
         inputCheckNot.disabled = true
         priceDelivery.style = "visivility:visible;"
         priceShipping.style = "color:green;border-color:green;font-weight:bold;"
    } else {
        inputCheckNot.disabled = false
        priceDelivery.style = "display:none;"
        priceShipping.value = ""
    }
});

inputCheckNot.addEventListener('change', function() {
    if (inputCheckNot.checked) {
        priceShipping.value = ""
        hasDelivery = "no"
        inputCheckYes.disabled = true
        priceDelivery.style = "display:none;"
    } else {
        inputCheckYes.disabled = false
        priceDelivery.style = "display:none;"
        priceShipping.value = ""
    }
});


firestore.collection("categories").get().then((querySnapshot) => {


    var sel = document.getElementById('listOptions');

    querySnapshot.forEach((doc) => {
        var opt = document.createElement('option');
        var name = doc.data().type_product
        opt.appendChild( document.createTextNode(name));
        opt.value = 'option value'; 
        sel.appendChild(opt); 
    }); 

}); 

var selector = document.getElementById('listOptions')
selector.addEventListener('change',function(){
    var item = document.getElementById('listOptions').options[document.getElementById('listOptions').selectedIndex].text
    typeProduct = item
})




function sendSolicitude(){
    if(gender != ""){
        if(firstname.value != "" && lastname.value != "" && dni.value != "" && phone.value != "" &&
        namestore.value != "" && address.value != "" && ruc.value != "" && mail.value != "" && password.value != ""){

            if(latitude.innerHTML != "" && longitude.innerHTML != ""){

                if(hasDelivery != ""){

                    if(typeProduct != ""){

                        if(hasDelivery == "si"){

                            if(priceShipping.value != ""){
                                writeUserData(address.value,"","",[],hasDelivery,dni.value,mail.value,firstname.value,lastname.value,gender,[],"","",
                                latitude.innerHTML,longitude.innerHTML,phone.value,namestore.value,"",password.value,priceShipping.value,0,ruc.value,"",0,"",typeProduct,"provider")    
                            
                            }else{
                                alertify.alert("Hey!","Ingrese el precio de delivery!")
                              }
                            }
                        else{
                            writeUserData(address.value,"","",[],hasDelivery,dni.value,mail.value,firstname.value,lastname.value,gender,[],"","",
                            latitude.innerHTML,longitude.innerHTML,phone.value,namestore.value,"",password.value,priceShipping.value,0,ruc.value,"",0,"",typeProduct,"provider")    
                        }
                        
                    }else{
                        alertify.alert("Hey!","Seleccione una categoria!")
                    }

                }else{
                    alertify.alert("Hey!","Seleccione si incluye delivery su negocio!")
                }

            }else{
                alertify.alert("Hey!","Agrege la ubicación de su negocio!")
            }
          
       }else{
        alertify.alert("Hey!","Complete los campos!")
       }
    }else{
        alertify.alert("Hey!","Seleccione un género!")
    }
    
}


function writeUserData(address,closingTime,codeClient,days,delivery,dni,email,firstName,lastname,gender,hours,id,image,latitude,longitude,mobile,nameStore,
    openingHours,password,priceDelivery,profileCompleted,ruc,sku,timestamp,typePackage,typeProduct,typeUser) {
    
        spinner()
        document.getElementById("btn-afi").disabled = true
    
        firebase.database().ref("SolicitudSocio").push({

      address: address,
      closing_time: closingTime,
      code_client : codeClient,
      days : days,
      delivery : delivery,
      dni : dni,
      email : email,
      firstName : firstName,
      gender : gender,
      hours : hours,
      id : id,
      image : image,
      lastname : lastname,
      latitude : latitude,
      longitude : longitude,
      mobile : mobile,
      name_store : nameStore,
      opening_hours:openingHours,
      password : password,
      price_delivery : priceDelivery,
      profileCompleted : profileCompleted,
      ruc : ruc,
      sku : sku,
      timestamp : timestamp,
      type_package : typePackage,
      type_product : typeProduct,
      type_user : typeUser

    }, (error) => {
        if (error) {
          // The write failed...
          spinner()
          document.getElementById("btn-afi").disabled = false

        alertify.error("Error : Intentelo mas tarde...")
        } else {
          // Data saved successfully!
          sendSms()
          spinner()
          alertify.confirm("Afiliación completada!","Se le enviará un mensaje de confirmación de su cuenta a su teléfono ",
          function(){
            location.reload()
          },
           function(){
            location.reload()
         });

          alertify.success("Afiliación completa!")
          document.getElementById("btn-afi").disabled = false
        }
      });
  }

  function spinner(){
    var x = document.getElementById("div-loader");
    if (x.style.display === "none") {
      x.style.display = "inline";
    } else {
      x.style.display = "none";
     
    }
  }

  function sendSms(){

    var phone = "+51989280394"
    var strPhone = ""+phone+"";
    
    const data = JSON.stringify({
    "messages": [
      {
        "source": "mashape",
        "from": "Test",
        "body": "Alguien quiere ser nuestro socio!",
        "to":    strPhone,
        "schedule": "1452244637",
        "custom_string": "prueba"
      }
    ]
    });
    
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);
    }
    });
    
    xhr.open("POST", "https://clicksend.p.rapidapi.com/sms/send");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("authorization", "Basic Y29udGFjdG9AY29uZXhmaW4ub3JnOkZpbmFuemFzaW50ZWxpZ2VudGVzMTArKg==");
    xhr.setRequestHeader("x-rapidapi-host", "clicksend.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "a79f8e5c23mshc421c059f1161bfp1c0b26jsn40bee7f91d53");
    
    xhr.send(data);
    
    }
    