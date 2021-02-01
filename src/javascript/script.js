var idPulsado,
    botones = new Array(),
    bombas = new Array(),
    usados = new Array()
    banderas = new Array(),
    primera = 0,
    contadorClick = 0,
    continuarTiempo = true,
    primeraTiempo = 0,
    nbanderas=10;

document.getElementById("startt").addEventListener("click", function(e){
   
    document.getElementById("iddiv2").style.display = "none";
    document.getElementById("iddiv1").style.display = "block";
    document.getElementById("tiempo").style.display = "block";
    document.getElementById("banderas").style.display = "block";
    
});

//======crear las celdas/asigna id======//
for(var i=0; i < 81; i++) {
    var btn = document.createElement("button");
    document.getElementById("iddiv1").appendChild(btn); 
    btn.id = i;
    btn.classList.add("botones");
    botones[i] = btn;
    btn.innerHTML = "&#8203";
    botones[i].onmousedown = (e) => { 
        if(!primeraTiempo) {
            interval();
            primeraTiempo++;
        }
        idPulsado = e.currentTarget.id;
        console.log(bombas);
        var celda = e.path[0];

        if(!primera) {
            bombas = generarBombas(idPulsado);
            primera++;
        }

        if(e.which == 3) {
            
            if(contadorClick < 10 && !banderas.includes(idPulsado.toString())) {
                nbanderas--;
                celda.style.background = 'url("src/imgs/bandera.png")';
                celda.style.backgroundRepeat = "no-repeat";
                celda.style.backgroundSize = "cover";
                celda.innerHTML = "&#8203";
                banderas.push(idPulsado);
                contadorClick++;

            } else if(banderas.includes(idPulsado.toString())) {
                nbanderas++;
                celda.style.background = '';
                celda.backgroundColor = "#38e0f6";
                celda.color = "#38e0f6";
                celda.innerHTML = "&#8203";
                banderas.splice(banderas.indexOf(idPulsado.toString()), 1);
                contadorClick--;
            }
            document.getElementById("pbanderas").innerHTML = "&#8203 " + nbanderas;

        } else {
            console.log(banderas)
            if(!banderas.includes(idPulsado.toString())) {
                celda.disabled = true;
                celda.style.backgroundColor = "#2fc1d4"; 
                celda.style.color = "black";
                celda.innerHTML = idPulsado;
                console.log("left " + idPulsado);
                
                celda.innerHTML = verificarBomba(idPulsado);
                

                if(bombas.includes(parseInt(idPulsado))) { // cuando se pierde...
                    celda.style.background = 'url("src/imgs/bomba3.png")';
                    celda.style.backgroundRepeat = "no-repeat";
                    celda.style.backgroundSize = "cover";
                    celda.innerHTML = "&#8203";
                    
                    for(var i = 0; i < bombas.length; i++) {
                        document.getElementById(bombas[i]).style.background = 'url("src/imgs/bomba3.png")';
                        document.getElementById(bombas[i]).style.backgroundRepeat = "no-repeat";
                        document.getElementById(bombas[i]).style.backgroundSize = "cover";
                        document.getElementById(bombas[i]).innerHTML = "&#8203";
                    }
                    for(var i = 0; i < botones.length; i++){
                        botones[i].disabled = true;
                    }
                    continuarTiempo = false;
                    document.getElementById("finJuego").style.display = "block";
                    document.getElementById("restart").style.display = "block";
                    document.getElementById("mensaje").style.display = "block";

                }
            }
        }
    }
}
//=============================================//

function verificarBomba(idPulsado){
    var contador= 0,
        noDerecha = [8,17,26,35,44,53,62,71,80],
        noIzquierda = [0,9,18,27,36,45,54,63,72];

    if((bombas.includes(parseInt(idPulsado)+1) && !noDerecha.includes(parseInt(idPulsado)))){
        contador++;
    }
    if((bombas.includes(parseInt(idPulsado)-1) && !noIzquierda.includes(parseInt(idPulsado)))){
        contador++;
    }
    if(bombas.includes(parseInt(idPulsado)+9)){
        contador++;
    }
    if(bombas.includes(parseInt(idPulsado)-9)){
        contador++;
    }
    if((bombas.includes(parseInt(idPulsado)+8) && !noIzquierda.includes(parseInt(idPulsado)))) {
        contador++;
    }
    if((bombas.includes(parseInt(idPulsado)-8) && !noDerecha.includes(parseInt(idPulsado)))){
        contador++;
    }
    if((bombas.includes(parseInt(idPulsado)+10) && !noDerecha.includes(parseInt(idPulsado)))){
        contador++;
    }
    if((bombas.includes(parseInt(idPulsado)-10) && !noIzquierda.includes(parseInt(idPulsado)))){
        contador++;
    }
    return contador
}


//======creacion de numeros aleatorios y control======//
function generarBombas(idPulsado){
    var ale = new Array();
    while(ale.length < 10) {
        var n = Math.floor(Math.random() * 81);
        if(!ale.includes(parseInt(n)) && n != parseInt(idPulsado)) {
            ale.push(n)
        }
    }
    return ale;
}

//=============================================//

//======dehabilitar click derecho en iddiv======//
function inhabilitar(){
    return false
}
bloke1 = document.getElementById("iddiv1");
bloke2 = document.getElementById("finJuego");
bloke1.oncontextmenu=inhabilitar 
bloke2.oncontextmenu=inhabilitar 
//=============================================//


//======detectar que boton del mouse es precionado======//
function pulsar(ev) {
    evento = ev || window.event;
    botPulsado = evento.button;
    }
    window.onload = function() {
        document.documentElement.onmousedown = pulsar;
    }
//=============================================//

