/**
 * @file Main page of the project, start the webserver by executing it
 * @author CIReserve
 * @version 1.0.0
 */

//****************************
//*         Consts           *
//****************************
// Setup requires and https keys & certificates
const express = require("express");
const app = express();
const fs = require("fs");
const https = require("https");
const request = require("./server/modules/request");


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