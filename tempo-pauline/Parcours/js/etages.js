var button = document.getElementById('Betage1');
var button1 = document.getElementById('Betage3');
var button2 = document.getElementById('Betage4');
var button3 = document.getElementById('Betage6');


var etage100 = document.getElementById('etage1');
var etage300 = document.getElementById('etage3');
var etage400 = document.getElementById('etage4');
var etage600 = document.getElementById('etage6');



window.afficher100 = function(){
    etage300.style.display = (etage100.style.display == "none") ? "none" : "none";
    etage400.style.display = (etage400.style.display == "none") ? "none" : "none";
    etage600.style.display = (etage600.style.display == "none") ? "none" : "none";
    etage100.style.display = (etage100.style.display == "block") ? "none" : "block";

}

window.afficher300 = function(){

    etage100.style.display = (etage100.style.display == "none") ? "none" : "none";
    etage400.style.display = (etage400.style.display == "none") ? "none" : "none";
    etage600.style.display = (etage600.style.display == "none") ? "none" : "none";
    etage300.style.display = (etage300.style.display == "block") ? "none" : "block";
}

window.afficher400 = function(){
    etage100.style.display = (etage100.style.display == "none") ? "none" : "none";
    etage300.style.display = (etage400.style.display == "none") ? "none" : "none";
    etage600.style.display = (etage600.style.display == "none") ? "none" : "none";
    etage400.style.display = (etage400.style.display == "block") ? "none" : "block";
}
    
window.afficher600 = function(){
    etage100.style.display = (etage100.style.display == "none") ? "none" : "none";
    etage400.style.display = (etage400.style.display == "none") ? "none" : "none";
    etage300.style.display = (etage600.style.display == "none") ? "none" : "none";
    etage600.style.display = (etage600.style.display == "block") ? "none" : "block";
}





button.onclick = afficher100;
button1.onclick = afficher300;
button2.onclick = afficher400;
button3.onclick = afficher600;