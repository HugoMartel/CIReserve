/**
 * @file Main page of the project, start the webserver by executing it
 * @author CIReserve
 * @version 1.0.0
 */

//****************************
//*         Consts           *
//****************************
// Setup requires and https keys & certificates
const { ObjectID } = require("bson");
const express = require("express");
const { Result } = require("express-validator");
const app = express();
const fs = require("fs");
const { connect } = require("http2");
const https = require("https");
const connection = require("./server/modules/connection.js");



//const expressJwt = require('express-jwt');
const key = fs.readFileSync(__dirname + '/server/ssl/key.pem');
const cert = fs.readFileSync(__dirname + '/server/ssl/cert.pem');

// Request handling requires
const jsonParser = express.json();

// Setup server and socket
/** @constant {Object} server https server used to host the project*/
const server = https.createServer({ key: key, cert: cert }, app);
/** @constant {number} port port used to host the server on*/
const port = process.env.port || 4200; //! 4200 is also used by `ng serve`

// Socket.io
const io = require("socket.io")(server, { secure: true });


// App params
app.set("trust proxy", 1);
// Router
//app.use(express.static(__dirname + "/dist/cireserve"));
app.use(express.static(__dirname + "/tempo-pauline/"));
app.use(jsonParser);

// Example of connection.Connection.getRoom(): displays the information of the specified room.
/*connection.Connection.getRoom(108, 2, { projection : { _id : 0, "size(m²)" : 1}}, (result) => {
    console.log(result);
    //! Query result is accessible here
});*/

// Example of connection.Connection.getUser() : display the information of the specified user
/*connection.Connection.getUser("Noé", {projection : { _id : 0}}, (result) =>{
    console.log(result);
    //! Query result is accessible here
})*/

// Example of connection.Connection.getUser() : display the information of the specified reservation
/*connection.Connection.getBook(108, 2, new Date('2022-01-11T08:00:00.000+00:00'), new Date('2022-01-12T10:00:00.000+00:00'), {projection : { _id : 0}}, (result) =>{
    console.log(result);
    //! Query result is accessible here
})*/

// Example of connection.Connection.newBook():  adds a new book in the db
/*connection.Connection.getUser("Alexi", {projection : { _id : 1}}, (result) => {
    connection.Connection.newBook(110, 1, new Date('January 15, 2022 10:00:00'), new Date('January 15, 2022 12:00:00'), 2, result[0]._id.toString(), "Week-end");
})*/

// Example of connection.Connection.getUserWithId() : display the information of the specidied user id
/*connection.Connection.getUser("Noé", {projection : { _id : 1}}, (result) => {
    connection.Connection.getUserWithId(result[0]._id.toString(), {_id : 0}, (result) => {
        console.log(result);
    });
})*/

// Example of connection.Connection.newUser() : adds a new user in the db
//connection.Connection.newUser("Gugo", "mdpNoHash", true, 4);

// Example of conenction.Connection.getHash() : displays the password hash of someone
/*connection.Connection.getHash("Noé", (result) => {
    console.log("'"+result+"'");
    //! Query result is accessible here
})*/

// Example of connection.Connection.isUserNameExist() : checks if an userName is already uses
/*connection.Connection.isUserNameExist("Noé", (result) => {
    console.log(result);
    //! Query result is accessible here
})*/

// Example of conenction.Connection.modifyRoom() : updates datas of a room
//connection.Connection.modifyRoom(108, 2, {nbPerson : 64});

// Example of connection.Connection.modifyUser() : It updates datas of an user
//connection.Connection.modifyUser("Noé", {isAdmin : true});

// Example of connection.Connection.deletUser() : removes an user from the db
//connection.Connection.deletUser("Noé");

// Example of connection.Connection.deletBook() : removes a book from the db
/*connection.Connection.getUser("Alexi", {projection : { _id : 1}}, (result) => {
    connection.Connection.deletBook(110, 1, new Date('January 15, 2022 10:00:00'), new Date('January 15, 2022 12:00:00'), result[0]._id.toString());
})*/

//*******************
//!       GET       !
//*******************
app.get("/home", (req, res) => {
    console.log("GET <- " + __dirname + "/dist/cireserve/index.html");
    //res.sendFile(__dirname + "/dist/cireserve/index.html");
    res.sendFile(__dirname + "/tempo-pauline/html/parcours.html");
});

app.get("/", (req, res) => {
    console.log("REDIRECT -> /home");
     res.redirect("/home");
});



//*******************
//!     POST        !
//*******************
app.post("/login/", (req, res) => {
    console.log("POST -> /login");

    let username = req.body.username; //username is the id TODO in the login form
    let password = req.body.password; //password is the id TODO in the login form
});

app.post("/register/", (req, res) => {
    console.log("POST -> /register");

    let username = req.body.username; //username is the id TODO in the register form
    let password = req.body.password; //password is the id TODO in the register form
});

app.post("/book/", (req, res) => {
    console.log("POST -> /book");

});

//***************************
//*        Socket.io        *
//***************************
io.on('connection', (socket) => {

    // Console message on connection
    console.log("> " + socket.id + " connected");

    // Console message on disconnection
    socket.on("disconnect", () => {
      console.log("< " + socket.id + " disconnected");
    });

    // Pour rediriger les différentes pages
    socket.on("Redirection",(data) => { socket.emit("Redirection2", data); });
});


//****************************s
//*       Server Start       *
//****************************
// Make the server use port 4200
server.listen(port, () => {
    console.log("Server is up and running on https://localhost:" + port + "/");
});

//****************************
//*     Clean up on exit     *
//****************************
process.stdin.resume(); //so the program will not close instantly

function exitHandler(options, exitCode) {
    if (options.cleanup) {
        console.log(
            "\n------------------------------------------------------------------"
        );
        console.log("Stopping the server...");
        // Final log :)
        console.log("***********************************************************");
        console.log("                      Alexis Chevet                        ");
        console.log("                      Pauline Jaspart                      ");
        console.log("         ,,,          Noe Klopocki             ,,,         ");
        console.log("        (0 0)         Louis Manouvriez        (* *)        ");
        console.log("  ---ooO-(_)-Ooo---   Hugo Martel       ---ooO-(_)-Ooo---  ");
        console.log("                      Théodore Martin                      ");
        console.log("                      Leo Pawlicki                         ");
        console.log("                      Nicolas Urquijo                      ");
        console.log("***********************************************************");
    }
    if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit) process.exit();
}

//do something when app is closing
process.on("exit", exitHandler.bind(null, { cleanup: true }));

//catches ctrl+c event
process.on("SIGINT", exitHandler.bind(null, { exit: true }));

// catches "kill pid"
process.on("SIGUSR1", exitHandler.bind(null, { exit: true }));
process.on("SIGUSR2", exitHandler.bind(null, { exit: true }));

//catches uncaught exceptions
process.on("uncaughtException", exitHandler.bind(null, { exit: true }));