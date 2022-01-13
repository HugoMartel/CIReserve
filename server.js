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
const { body, validationResult } = require("express-validator");
const app = express();
const fs = require("fs");
const { connect } = require("http2");
const https = require("https");

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const request = require("./server/modules/request");
const connection = require("./server/modules/connection.js");


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
app.get("/home", authenticateToken, (req, res) => {
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
app.post("/login", body('email').trim().escape().isEmail().isLength({ max: 100 }), body('password').isLength({ max: 100 }), (req, res) => {
    console.log("POST -> /login");

    let email = req.body.email; //username is the id TODO in the login form
    let password = req.body.password; //password is the id TODO in the login form

    //Sanitize user intput
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }


    // db request
    connection.Connection.getUserWithMail(email, { _id: 0 }, (result) => {

        console.log(result);

        if (
            result[0] == undefined ||
            result[0].userName == undefined ||
            result[0].hash == undefined ||
            result[0].classe == undefined ||
            result[0].email == undefined ||
            result[0].isAdmin == undefined
        ) {
            return res.status(200).json({
                fail: "Wrong password or email..."
            });
        }

        /* Check password */
        bcrypt.compare(password, result[0].hash, function (err, same) {
            if (err) {
                console.log("Hash failed");
                return res.status(400).json({ errors: "Error while processing login" });
            } else {
                /* Password is wrong, abort */
                if (same === false) {
                    return res.status(200).json({ fail: "Wrong password or email..." });
                }
                /* Password is good, continue */

                // Convert classe
                let classe;
                switch (result[0].classe) {
                    case -1: classe = "externe"; break;
                    case 0: classe = "admin"; break;
                    case 1: classe = "prof"; break;
                    case 2: classe = "CIR1"; break;
                    case 3: classe = "CIR2"; break;
                    case 4: classe = "CIR3"; break;
                    case 5: classe = "CPG1"; break;
                    case 6: classe = "CPG2"; break;
                    case 7: classe = "CPG3"; break;
                    case 8: classe = "CNB1"; break;
                    case 9: classe = "CNB2"; break;
                    case 10: classe = "CNB3"; break;
                    case 11: classe = "M1"; break;
                    case 12: classe = "M2"; break;
                    default: classe = "Classe inconnue.";
                }

                /* Create session token */
                const jwtBearerToken = jwt.sign({ name: result[0].userName, email: result[0].email, admin: result[0].isAdmin, classe: classe }, TOKEN_RSA_PRIVATE_KEY, {
                    algorithm: 'RS256',
                    expiresIn: '1800s'
                });

                // set it in an HTTP Only + Secure Cookie
                res.cookie("SESSIONID", jwtBearerToken, { httpOnly: true, secure: true });

                // set it in the HTTP Response body
                return res.status(200).json({
                    success: "Successfully connected!",
                    idToken: jwtBearerToken,
                    expiresIn: 120
                });
            }
        });
    });
});

app.post("/register/", body('email').trim().escape().isEmail().isLength({ max: 100 }), body('password').trim().escape().isLength({min : 5, max: 100 }), body('username').trim().escape().isLength({min : 1, max : 20}), body('isAdmin').isBoolean(), body('classe').isNumeric(), (req, res) => {
    console.log("POST -> /register");

    let username = req.body.username; //username is the id TODO in the register form (?)
    let password = req.body.password; //password is the id TODO in the register form (?)
    let email = req.body.email;
    let isAdmin = req.body.isAdmin;
    let classe = req.body.classe;

    // Sanitize user intput
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    // Check email in the db
    connection.Connection.isEmailExist(email, (result) =>{
        if(result){ 
            return res.status(200).json({ fail : "Cet addresse mail existe déjà.." });
        }
        // Store in the database and get the user id
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                
                if(err){
                    return res.status(400).json({
                        errors: "Impossible de générer un moto de passe.."
                    })
                }

                connection.Connection.newUser(username, email, hash, isAdmin, classe);
                
                return res.status(200).json(generateAccessToken({ id: 0 }))//! move into the request callback (?)
            });
        });
    })

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