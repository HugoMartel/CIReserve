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
    console.log("token: " + token);//! DEBUG

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


app.get("*", (req, res) => {
    console.log("REDIRECT -> /home");
    res.redirect("/home");
});



//*******************
//!     POST        !
//*******************
//==============================
//            LOGIN
//==============================
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
                fail: "Mauvais email ou mot de passe..."
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
                    return res.status(200).json({ fail: "Mauvais email ou mot de passe..." });
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
                    success: "Vous êtes connecté !",
                    name: result[0].userName,
                    admin: result[0].isAdmin,
                    idToken: jwtBearerToken,
                    expiresIn: 120
                });
            }
        });
    });
});


//==============================
//          REGISTER
//==============================
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
                        errors: "Impossible de générer un mot de passe.."
                    })
                }

                connection.Connection.newUser(username, email, hash, isAdmin, classe, (success) => {
                    if (success) {
                        return res.status(200).json({ success: "L'utilisateur " + username + " a bien été ajouté à la collection !" });
                    } else {
                        return res.status(200).json({ fail: "Impossible d'ajouter l'utilisateur à la collection..." });
                    }
                });

            });
        });
    })

});


//==============================
//            BOOK
//==============================
app.post("/book/", body('userName').isLength({min:1}), body('room').trim().escape().isAlphanumeric().isLength({min:3}), body('reason').trim().isLength({min : 1}),(req, res) => {
    console.log("POST -> /book");

    console.log(req.body);

    let begin = new Date(req.body.begin); // new Date
    let end = new Date(req.body.end); // new Date
    let reason = req.body.reason; // String
    let room = req.body.room; // String : building + floor
    let userName = req.body.userName; // String userName from localStorage.getItem("name")

    //Sanitize user intput
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    // Check value
    if(begin > end){
        return res.status(200).json({
            fail : "La tranche horaire est incohérente.."
        });
    }

    let building = room[0];
    let floor = eval(room.substr(1));

    // Check if room exist and if it is bookable
    connection.Connection.getRoom(floor, building, {projection : {_id:0, isBookable:1}}, (roomCheck) =>{
        if(roomCheck[0] ==  undefined){
            return res.status(200).json({
                fail: "Cette salle n'existe pas."
            })
        }
        if(!roomCheck[0].isBookable){
            return res.status(200).json({
                fail: "Cette salle ne peut pas être réservée."
            })
        }

        // Check available
        connection.Connection.allReservationDuring(floor, floor, begin, end, (reservationCheck) =>{
            if(reservationCheck.length != 0){
                return res.status(200).json({
                    fail: "Cette salle est déjà réservée sur ce créneau."
                })
            }

            // Get user Id
            connection.Connection.getUser(userName, {projection : { _id : 1}}, (userId) =>{

                // If nothing find
                if(userId[0] == undefined){
                    return res.status(200).json({
                        fail : "Impossible de vous reconnaitre."
                    })
                }

                // Add in db
                connection.Connection.newBook(floor, building, begin, end, Math.trunc((end - begin) * 2.77778e-7), userId[0]._id.toString(), reason, (success) => {
                    if (success) {
                        return res.status(200).json({ success: "L'utilisateur " + userName + " a bien réservé la salle " + room + " !" });
                    } else {
                        return res.status(200).json({ fail: "Impossible d'ajouter l'utilisateur à la collection..." });
                    }
                });
            })
        })
    })
});


//==============================
//            FLOOR
//==============================
app.post("/floor", (req, res) => { //body('floor').isNumeric(), body('begin').isDate(), body('end').isDate()
    console.log("POST -> /floor");

    let floor = req.body.floor;
    let begin = req.body.begin;
    let end = req.body.end;
    let floorMax, floorMin;

    switch(floor){
        case 1: floorMin = 100; floorMax = 199; break;
        case 2: floorMin = 200; floorMax = 399; break;
        case 3: floorMin = 400; floorMax = 599; break;
        case 4: floorMin = 600; floorMax = 699; break;
        case 5: floorMin = 700; floorMax = 899; break;
        case 6: floorMin = 900; floorMax = 999; break;
        default : floorMin = 0; floorMax = 0;
    }

// +-----------+-----------------+
// | Btn Value | Floors to query |
// +===========+=================+
// |         1 | 100             |
// |         2 | 200/300         |
// |         3 | 400/500         |
// |         4 | 600             |
// |         5 | 700/800         |
// |         6 | 900             |
// +-----------+-----------------+

    //Sanitize user intput
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    // Check value
    if(begin > end){
        return res.status(200).json({
            fail : "La tranche horaire est incohérente.."
        });
    }

    // db query
    connection.Connection.allRoomFloor(floorMin, floorMax, (resultRoom) => {
        connection.Connection.allReservationDuring(floorMin, floorMax, begin, end, (resultReservation) => {
            let result = [];

            resultRoom.forEach(room => {
                let find = false;
                let index = 0;
                let toPush = {}

                toPush.name = room.building + room.floor;
                toPush.imgPos = room.imgPos;
                toPush.isBookable = room.isBookable;

                // Generate the room's modal info
                /*
                <div class="modal-header">
                    <h2>room number</h2>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    <h6> Statut réservation : </h6>
                    <h6> Capacité salle : </h6>
                    <h6> Projecteur :</h6>
                    <h6> Nombre de prises :</h6>
                    <hr/>
                    <button class="book">Réserver</button>
                </div>
                */
                toPush.modalContent = '<!-- Generated Modal --><div class="modal-header"><h2>' + room.building + room.floor
                toPush.modalContent += '</h2><span class="close">&times;</span></div><div class="modal-body"><h6>Statut réservation : ';

                while (index < resultReservation.length && !find) {
                    if(room.floor == resultReservation[index].floor && room.building == resultReservation[index].building){
                        find = true;
                        toPush.booked = true;
                        toPush.modalContent += "Réservé (" + resultReservation[index].reason + ")";
                    }
                    index++;
                }

                // Check if the room isn't booked
                if (!find) {
                    toPush.booked = false;
                    toPush.modalContent += "Libre";
                }

                toPush.modalContent += "</h6><h6>Capacité salle : " + room.nbPerson + "</h6>"
                                    + "<h6>Projecteur : " + (room.hasProj ? "oui" : "non") + "</h6>"
                                    + "<h6>Nombre de prises : " + room.nbPlug + "</h6>"
                                    + "<h6>Taille : " +  room.roomSize_m2 + " m²</h6>"
                                    + "<h6>Précisions : " + room.other + "</h6><hr/>";

                if (find) {
                    toPush.modalContent += '<button class="book">Réserver</button>';
                }

                toPush.modalContent += "</div>";
                result.push(toPush);
            })

            return res.status(200).json({
                rooms : result,
            })
        })
    })
})

app.post("/user_bookings", body('id').isAlphanumeric(), (req, res) => { 
    console.log("POST -> /user_bookings");

    let id = req.body.id;   // String userName from localStorage.getItem("name")

    //Sanitize user intput
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    // Get reservations from db
    connection.Connection.getReservationWithId(id, { projection : {_id: 0, duration: 0, user: 0}}, (reservations) => {
        let result = [];

        // Prepare the data for display
        reservations.forEach(reserv => {
            let toPush = {};
            
            toPush.room = reserv.building + reserv.floor;
            toPush.reason = reserv.reason;
            toPush.time = ((reserv.begin.getMonth()+1 < 10) ? "0" + (reserv.begin.getMonth()+1) : reserv.begin.getMonth()+1) + "/"+reserv.begin.getDate() + " " + ((reserv.begin.getHours() < 10) ? "0"+reserv.begin.getHours() : reserv.begin.getHours()) + "h" + ((reserv.begin.getMinutes() < 10) ? "0"+reserv.begin.getMinutes() : reserv.begin.getMinutes()) + ", " + ((reserv.end.getMonth()+1 < 10) ? "0" + (reserv.end.getMonth()+1) : reserv.end.getMonth()+1) + "/"+reserv.end.getDate() + " " + ((reserv.end.getHours() < 10) ? "0"+reserv.end.getHours() : reserv.end.getHours()) + "h" + ((reserv.end.getMinutes() < 10) ? "0"+reserv.end.getMinutes() : reserv.end.getMinutes());
            
            result.push(toPush);
        })

        return res.status(200).json({
            reservations : result,
        })
    })


})


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