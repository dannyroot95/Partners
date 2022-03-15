 function urlModulo(url){
    return "<iframe src='"+url+"' style='width: 100%; height: 100%; border: none;'></iframe>";
    //agregar permisoso por usurio leer modificr guardar eliminar
 }


 function listaModulos(modulo,contenedor) {
    if ("#Pcontrol"==modulo) {
            contenedor.innerHTML =urlModulo("modulos/panel-control.html") ;
    } 
    else if ("#profile"==modulo) {
            contenedor.innerHTML =urlModulo("modulos/profile.html") ;
    }
    else if ("#products" == modulo) {
        contenedor.innerHTML = urlModulo("modulos/products.html") ;
    }
    else if ("#orders" == modulo) {
        contenedor.innerHTML = urlModulo("modulos/orders.html") ;
    }
    else if ("#hours"==modulo) {
        contenedor.innerHTML = urlModulo("modulos/hours.html") ;
}
    else if ("#"==modulo) {
            contenedor.innerHTML ="<br>&nbsp;&nbsp;Muy Pronto...";
    }
        else {
                contenedor.innerHTML =urlModulo("modulos/panel-control.html") ;
    }
 }

 