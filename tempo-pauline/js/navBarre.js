/*
            * * * * * * * * * * * * * * * * * *
            *                                 *
            *           Fichier  JS           *
            *        Barre de navigation      *
            *                                 *
            * * * * * * * * * * * * * * * * * *
*/

// Redirection vers le Parcours
document.getElementById("GoParcours").addEventListener("click", event => {
  socket.emit("Redirection","/html/parcours.html", false);
});
// Redirection vers la Réservation
document.getElementById("GoReservation").addEventListener("click", event => {
  socket.emit("Redirection","/html/reservation.html", false);
});
// Redirection vers ADMIN création de compte
document.getElementById("GoRegister").addEventListener("click", event => {
socket.emit("Redirection","/html/register.html", false);
});
// Redirection vers ADMIN modification du plan/salle
document.getElementById("GoModifPlan").addEventListener("click", event => {
socket.emit("Redirection","/html/modif_plan.html", false);
});
// Redirection vers ADMIN réservation permanente
document.getElementById("GoResaPerm").addEventListener("click", event => {
socket.emit("Redirection","/html/permanent.html", false);
});
// Redirection vers ADMIN modification de réservation
document.getElementById("GoModifResa").addEventListener("click", event => {
socket.emit("Redirection","/html/modif_resa.html", false);
});
// Redirection vers ADMIN paramètres généraux
document.getElementById("GoModifPlan").addEventListener("click", event => {
socket.emit("Redirection","/html/parametres.html", false);
});

socket.on("Redirection2", data => {
document.location.href=data; 
});