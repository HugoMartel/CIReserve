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

const jwt = require('jsonwebtoken');
const request = require("./server/modules/request");


//const expressJwt = require('express-jwt');
const key = fs.readFileSync(__dirname + '/server/ssl/https/key.pem');
const cert = fs.readFileSync(__dirname + '/server/ssl/https/cert.pem');

// Request handling requires
const cookieParser = require("cookie-parser");
const jsonParser = express.json();
const expressJwt = require('express-jwt');


// Setup server and socket
/** @constant {Object} server https server used to host the project*/
const server = https.createServer({ key: key, cert: cert }, app);
/** @constant {number} port port used to host the server on*/
const port = process.env.port || 4200; //! 4200 is also used by `ng serve`


// App params
app.set("trust proxy", 1);
// Router
app.use(express.static(__dirname + "/dist/cireserve"));
app.use(jsonParser);

/**
 * Function used to generate an access token to keep someone connected
 * @param {Object} idObject User id to store in the cookies
 * @returns {string} token generated
 */
function generateAccessToken(idObject) {
    return jwt.sign(idObject, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}


/** @constant {string} TOKEN_RSA_PRIVATE_KEY */
const TOKEN_RSA_PRIVATE_KEY = fs.readFileSync(__dirname + "/server/ssl/token/private.key");

/** @constant {string} TOKEN_RSA_PUBLIC_KEY */
const TOKEN_RSA_PUBLIC_KEY = fs.readFileSync(__dirname + "/server/ssl/token/public.pem");

const checkIfAuthenticated = expressJwt({
    secret: TOKEN_RSA_PUBLIC_KEY,
    algorithms: ['RS256']
});


/* Middlware */
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    console.log(token);//! DEBUG

    if (token == null) {
        next();
        //return res.json({ connected: false });
        //return res.sendStatus(401);
    } else {

        jwt.verify(token, TOKEN_RSA_PUBLIC_KEY, (err, id) => {
            console.log(err)

            if (err) {
                console.log("Wrong auth token");
                return res.sendStatus(403);
            }

            req.id = id;

            next();
        });

    }
}


//*******************
//!       GET       !
//*******************
app.get("/home", authenticateToken,(req, res) => {
    console.log("GET <- " + __dirname + "/dist/cireserve/index.html");
    res.sendFile(__dirname + "/dist/cireserve/index.html");
});

// app.get("/book", authenticateToken, (req, res) => {
//     console.log("GET <- " + __dirname + "/dist/cireserve/index.html");
//     res.sendFile(__dirname + "/dist/cireserve/index.html");
// });

app.get("*", (req, res) => {
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
    //TODO Sanitize user intput

    //TODO db request
    const userId = 0;//! TMP

    /* Create session token */
    const jwtBearerToken = jwt.sign({}, TOKEN_RSA_PRIVATE_KEY, {
        algorithm: 'RS256',
        expiresIn: '1800s',
        subject: userId
    });

    // set it in an HTTP Only + Secure Cookie
    //res.cookie("SESSIONID", jwtBearerToken, {httpOnly:true, secure:true});

    // set it in the HTTP Response body
    res.status(200).json({
        idToken: jwtBearerToken,
        expiresIn: 120
    });
});

app.post("/register/", (req, res) => {
    console.log("POST -> /register");

    let username = req.body.username; //username is the id TODO in the register form
    let password = req.body.password; //password is the id TODO in the register form

    //TODO: verif user input

    //TODO: store in the database and get the user id

    res.json(generateAccessToken({ id: 0 }))//! move into the request callback

});

app.post("/book/", (req, res) => {
    console.log("POST -> /book");

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
        console.log("                      Theodore Martin                      ");
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