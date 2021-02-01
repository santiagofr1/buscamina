var inter,tiempo = 0;
function interval(){
    inter=setInterval(function(){
        tiempo++;
        if(continuarTiempo) 
            document.getElementById("tiempo1").innerHTML = "&#8203 " + tiempo;
    },1000);
}