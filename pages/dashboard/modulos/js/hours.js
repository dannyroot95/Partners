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


const floating_btn = document.querySelector('.floating-btn');
const close_btn = document.querySelector('.close-btn');
const social_panel_container = document.querySelector('.social-panel-container');

const openInput = document.getElementById("opening")
openInput.addEventListener('input', updateValueOpen);

const closeInput = document.getElementById("closing")
closeInput.addEventListener('input', updateValueClose);

var checkMonday = document.getElementById("chkMonday")
var checkThursday = document.getElementById("chkThursday")
var checkWednesday = document.getElementById("chkWednesday")
var checkTuesday = document.getElementById("chkTuesday")
var checkFriday =  document.getElementById("chkFriday")
var checkSaturday = document.getElementById("chkSaturday")
var checkSunday = document.getElementById("chkSunday")

var arrayCheckBoxDays = [checkMonday,checkThursday,checkWednesday,checkTuesday,checkFriday,checkSaturday,checkSunday]

eventListenerCheckedDays()

var btnHour = document.getElementById("btnValidateHours")
var btnUpdateHourAndDay = document.getElementById("btnFloat")
var myTable = document.getElementById("myTable")


function updateValueOpen(e) {

  var x = document.getElementById("myTable");
    var monday = document.getElementById("timeOpenMonday") 
    var thursday =document.getElementById("timeOpenThursday") 
    var wednesday = document.getElementById("timeOpenWednesday") 
    var tuesday = document.getElementById("timeOpenTuesday") 
    var friday = document.getElementById("timeOpenFriday") 
    var saturday = document.getElementById("timeOpenSaturday") 
    var sunday = document.getElementById("timeOpenSunday") 

    var inputsArrayOpen = [monday,thursday,wednesday,tuesday,friday,saturday,sunday] 
    

  if (window.getComputedStyle(x).display === "none") {

    for(var i=0; i<inputsArrayOpen.length ; i++){
        inputsArrayOpen[i].value = e.srcElement.value
    }

  
  }else{
    for(var i = 0; i<arrayCheckBoxDays.length; i++){
        if(arrayCheckBoxDays[i].checked == true){
            inputsArrayOpen[i].value = e.srcElement.value
        }
    }
  }
 
}

function updateValueClose(e) {

    var x =   document.getElementById("myTable")

    var monday = document.getElementById("timeCloseMonday") 
    var thursday =  document.getElementById("timeCloseThursday")
    var wednesday = document.getElementById("timeCloseWednesday")
    var tuesday =  document.getElementById("timeCloseTuesday")
    var friday =  document.getElementById("timeCloseFriday")
    var saturday = document.getElementById("timeCloseSaturday")
    var sunday = document.getElementById("timeCloseSunday")

    var inputsArrayClose = [monday,thursday,wednesday,tuesday,friday,saturday,sunday] 

    if (window.getComputedStyle(x).display === "none"){

        for(var i=0; i<inputsArrayClose.length ; i++){
            inputsArrayClose[i].value = e.srcElement.value
        }
    
    }else{
        for(var i = 0; i<arrayCheckBoxDays.length; i++){
            if(arrayCheckBoxDays[i].checked == true){
                inputsArrayClose[i].value = e.srcElement.value
            }
        }
    }



  }


if(js["opening_hours"] != "" && js["opening_hours"] != null){


    btnHour.remove()

    document.getElementById("opening").value = js["opening_hours"]
    document.getElementById("closing").value = js["closing_time"]
    //document.getElementById("btnValidateHours").style = "display:none;"

    document.getElementById("progress").innerHTML = "<style> .progress::after {border-radius: 3px;background-color: #1D8348;content: '';position: absolute; top: 0;left: 0;height: 5px;width: 100%;}</style>"
    document.getElementById("progresstxt").innerHTML = "100% Completado"
    document.getElementById("configHour").innerHTML = "Horario configurado!"
    document.getElementById("configHour").style = "color:#01903F;font-weight: bold;"

    btnUpdateHourAndDay.classList = "floating-btn"
    btnUpdateHourAndDay.style = "visibility:visible;"
    myTable.style = "visibility:visible;"

    if(js["days"][0] != ""){
        checkMonday.checked = true
        let hour = js["hours"][0]
        const myArrayHour = hour.split(";")
        document.getElementById("timeOpenMonday").value = myArrayHour[0]
        document.getElementById("timeCloseMonday").value = myArrayHour[1]
    }if(js["days"][1] != ""){
        checkThursday.checked = true
        let hour = js["hours"][1]
        const myArrayHour = hour.split(";")
        document.getElementById("timeOpenThursday").value = myArrayHour[0]
        document.getElementById("timeCloseThursday").value = myArrayHour[1]
    }if(js["days"][2] != ""){
        checkWednesday.checked = true
        let hour = js["hours"][2]
        const myArrayHour = hour.split(";")
        document.getElementById("timeOpenWednesday").value = myArrayHour[0]
        document.getElementById("timeCloseWednesday").value = myArrayHour[1]
    }if(js["days"][3] != ""){
        checkTuesday.checked = true
        let hour = js["hours"][3]
        const myArrayHour = hour.split(";")
        document.getElementById("timeOpenTuesday").value = myArrayHour[0]
        document.getElementById("timeCloseTuesday").value = myArrayHour[1]
    }if(js["days"][4] != ""){
        checkFriday.checked = true
        let hour = js["hours"][4]
        const myArrayHour = hour.split(";")
        document.getElementById("timeOpenFriday").value = myArrayHour[0]
        document.getElementById("timeCloseFriday").value = myArrayHour[1]
    }if(js["days"][5] != ""){
        checkSaturday.checked = true
        let hour = js["hours"][5]
        const myArrayHour = hour.split(";")
        document.getElementById("timeOpenSaturday").value = myArrayHour[0]
        document.getElementById("timeCloseSaturday").value = myArrayHour[1]
    }if(js["days"][6] != ""){
        checkSunday.checked = true
        let hour = js["hours"][6]
        const myArrayHour = hour.split(";")
        document.getElementById("timeOpenSunday").value = myArrayHour[0]
        document.getElementById("timeCloseSunday").value = myArrayHour[1]
    }

  

}



function validateHours(){

    var closeStore = document.getElementById("closing").value 
    var openStore = document.getElementById("opening").value 
   
   

    if(openStore != "" && closeStore != ""){

        btnHour.remove()

        document.getElementById("progress").innerHTML = "<style> .progress::after {border-radius: 3px;background-color: #FF0369;content: '';position: absolute; top: 0;left: 0;height: 5px;width: 90%;}</style>"
        document.getElementById("progresstxt").innerHTML = "90% Completado"

        myTable.style = "visibility:visible;"
        btnUpdateHourAndDay.style = "visibility:visible;"

        btnUpdateHourAndDay.onmouseover = function(e) {
            btnUpdateHourAndDay.className = "floating-btn"
        };

        checkedCheckBox()

    }else{
        alert("Complete los campos")
    }

}


function updateHoursAndDays(){

    var closeStore = document.getElementById("closing").value 
    var openStore = document.getElementById("opening").value 

    if(openStore != "" && closeStore != ""){
        openNav()
        var timeOpenMonday = document.getElementById("timeOpenMonday").value
        var timeOpenThursday= document.getElementById("timeOpenThursday").value
        var timeOpenWednesday = document.getElementById("timeOpenWednesday").value
        var timeOpenTuesday= document.getElementById("timeOpenTuesday").value
        var timeOpenFriday= document.getElementById("timeOpenFriday").value
        var timeOpenSaturday = document.getElementById("timeOpenSaturday").value 
        var timeOpenSunday = document.getElementById("timeOpenSunday").value 
    
        var timeCloseMonday = document.getElementById("timeCloseMonday").value
        var timeCloseThursday= document.getElementById("timeCloseThursday").value
        var timeCloseWednesday = document.getElementById("timeCloseWednesday").value
        var timeCloseTuesday= document.getElementById("timeCloseTuesday").value
        var timeCloseFriday= document.getElementById("timeCloseFriday").value
        var timeCloseSaturday = document.getElementById("timeCloseSaturday").value 
        var timeCloseSunday = document.getElementById("timeCloseSunday").value 
      
        var arrayBox = [checkMonday,checkThursday,checkWednesday,checkTuesday,checkFriday,checkSaturday,checkSunday]
        var arrayOpen = [timeOpenMonday,timeOpenThursday,timeOpenWednesday,timeOpenTuesday,timeOpenFriday,timeOpenSaturday,timeOpenSunday]
        var arrayClose = [timeCloseMonday,timeCloseThursday,timeCloseWednesday,timeCloseTuesday,timeCloseFriday,timeCloseSaturday,timeCloseSunday]
        var labelsWeek = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo']
        var daysSelect = []
        var hoursSelect = []
    
    
        for(var i = 0 ; i<arrayBox.length ; i ++){
            if(arrayBox[i].checked){
                if(arrayOpen[i] != "" || arrayClose[i] != ""){
                    daysSelect.push(labelsWeek[i])
                    hoursSelect.push(arrayOpen[i]+";"+arrayClose[i])
                }else{
                    daysSelect.push(labelsWeek[i])
                    hoursSelect.push(openStore+";"+closeStore)
                }
               
            }else{
                daysSelect.push("")
                hoursSelect.push("")
            }
        }


        var dataToUpdate = {opening_hours : openStore , closing_time : closeStore , days:daysSelect , hours : hoursSelect}

        firestore.collection("users").doc(js["id"]).update(dataToUpdate).then((docRef) => {


            firestore.collection("products").get().then((querySnapshot) => {

                querySnapshot.forEach((doc) => {
                    var providerId = doc.data().provider_id
                    if(providerId == js["id"]){
                       
                        firestore.collection("products").doc(doc.id).update(dataToUpdate) 
                       
                    }
                }); 

                firestore.collection("users").doc(js["id"]).get().then((querySnapshot) => {

                    localStorage.setItem('myData', JSON.stringify(querySnapshot.data()));

                    document.getElementById("progress").innerHTML = "<style> .progress::after {border-radius: 3px;background-color: #1D8348;content: '';position: absolute; top: 0;left: 0;height: 5px;width: 100%;}</style>"
                    document.getElementById("progresstxt").innerHTML = "100% Completado"
                    document.getElementById("configHour").innerHTML = "Horario configurado!"
                    document.getElementById("configHour").style = "color:#01903F;font-weight: bold;"
                    
                    closeNav()
                    alertify.success('Horario Actualizado!');


                }); 

            });       
        })
        .catch((error) => {

          closeNav()
          alertify.error('Error!');
        });

 
    }else{
        alertify.alert('Alerta!','Debe tener horario de apertura y cierre establecido!');
    }
}


function openNav() {
    document.getElementById("myNav").style.width = "100%";
  }
  
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }


  function eventListenerCheckedDays(){

    checkMonday.addEventListener('click', function() {
        if(checkMonday.checked) {
            document.getElementById("timeOpenMonday").value = openInput.value
            document.getElementById("timeCloseMonday").value = closeInput.value
        } else {
            document.getElementById("timeOpenMonday").value = ""
            document.getElementById("timeCloseMonday").value = ""
        }
      });
      checkThursday.addEventListener('click', function() {
        if(checkThursday.checked) {
            document.getElementById("timeOpenThursday").value = openInput.value
            document.getElementById("timeCloseThursday").value = closeInput.value
        } else {
            document.getElementById("timeOpenThursday").value = ""
            document.getElementById("timeCloseThursday").value = ""
        }
      });
      checkWednesday.addEventListener('click', function() {
        if(checkWednesday.checked) {
            document.getElementById("timeOpenWednesday").value = openInput.value
            document.getElementById("timeCloseWednesday").value = closeInput.value
        } else {
            document.getElementById("timeOpenWednesday").value = ""
            document.getElementById("timeCloseWednesday").value = ""
        }
      });
      checkTuesday.addEventListener('click', function() {
        if(checkTuesday.checked) {
            document.getElementById("timeOpenTuesday").value = openInput.value
            document.getElementById("timeCloseTuesday").value = closeInput.value
        } else {
            document.getElementById("timeOpenTuesday").value = ""
            document.getElementById("timeCloseTuesday").value = ""
        }
      });
      checkFriday.addEventListener('click', function() {
        if(checkFriday.checked) {
            document.getElementById("timeOpenFriday").value = openInput.value
            document.getElementById("timeCloseFriday").value = closeInput.value
        } else {
            document.getElementById("timeOpenFriday").value = ""
            document.getElementById("timeCloseFriday").value = ""
        }
      });
      checkSaturday.addEventListener('click', function() {
        if(checkSaturday.checked) {
            document.getElementById("timeOpenSaturday").value = openInput.value
            document.getElementById("timeCloseSaturday").value = closeInput.value
        } else {
            document.getElementById("timeOpenSaturday").value = ""
            document.getElementById("timeCloseSaturday").value = ""
        }
      });
      checkSunday.addEventListener('click', function() {
        if(checkSunday.checked) {
            document.getElementById("timeOpenSunday").value = openInput.value
            document.getElementById("timeCloseSunday").value = closeInput.value
        } else {
            document.getElementById("timeOpenSunday").value = ""
            document.getElementById("timeCloseSunday").value = ""
        }
      });
  }


  function checkedCheckBox(){
    for(var i = 0; i<arrayCheckBoxDays.length; i++){
        arrayCheckBoxDays[i].checked = true
    }
  }