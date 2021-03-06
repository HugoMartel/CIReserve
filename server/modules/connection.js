/**
 * @file Connection module used to communicate with the db
 * @author CIReserve
 * @version 1.0.0
 */

const {MongoClient} = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

/**
 * Makes queries to the MongoDB database
 * @type {Object}
 * @return {Object} functions to use with the Connection module
 * @name Connection
 * @namespace Connection
 */
const Connection = (function() {

    /* Init Code */
    const url = 'mongodb://localhost:27017';
    const dbName = 'CIReserve';


    /**
     * @function Connection.get
     * @param {String} collection Name of the collection
     * @param {Object} elem Json object containing the conditions of the request
     * @param {Object} options Options of the query: fields to include/exclude, data order...
     * @param {Callback} callback
     * Callback function to return the data to
     * @returns {} /
     * @description Execute a query to get information
     */
    function get(collection, elem, options, callback) {
        let result = [];

        MongoClient.connect(url, async function(err, client) {
            let db = client.db(dbName);
            let cursor = db.collection(collection).find(elem, options);
            result = await cursor.toArray();
            callback(result);
        })

    }

    /**
     * @function Connection.newBook
     * @param {Number} nbFloor Room number "102, 108, 956..."
     * @param {String} nbBuild Letter from the building of the room "A,B,C"
     * @param {Date} start Date of the beginning of the research
     * @param {Date} finish Date of the end of the research 
     * @param {Number} time Duration in hours of the reservation
     * @param {String} userId Id of the user making the reservation
     * @param {String} Why Reason for booking
     * @param {Function} callback 
     * Callback function to return the data to
     * @returns {}/
     * @description Execute a query to book a room
     */
    function book(nbFloor, nbBuild, start, finish, time, userId, why, callback){
        MongoClient.connect(url, async function(err, client){
            if (err) {
                console.error("Error while add an user...");
                return callback(false);
            }

            let db = client.db(dbName);
            let cursor = db.collection('Reservations').insertOne({begin : start, end : finish, duration : time, user : userId, reason : why, building : nbBuild, floor : nbFloor})
            return callback(true);
        })
    }

    /**
     * @function Connection.newUser
     * @param {String} name Name of the new user
     * @param {String} mail email of the new user
     * @param {String} mdp encrypted password of the new user
     * @param {Boolean} admin If the new user is admin
     * @param {Number} numClasse New user class
     * @param {Function} callback 
     * Callback function to return the data to
     * @returns {}/
     * @description Execute a query to add an user to the db
     */
    function addUser(name, mail, mdp, admin, numClasse, callback){
        MongoClient.connect(url, async function(err, client){
            if (err) {
                console.error("Error while add an user...");
                return callback(false);
            }

            let db = client.db(dbName);
            let cursor = db.collection('Users').insertOne({userName : name, isAdmin : admin, classe : numClasse, hash : mdp, email : mail});
            return callback(true);
        })
    }

    /**
     * @function Connection.getHash
     * @param {String} mail User's email
     * @param {Callback} callback 
     * Callback function to return the data to
     * @returns {}/
     * @description Execute a query to find the password
     */
    function userHash(mail, callback){
        let result = [];

        MongoClient.connect(url, async function(err, client){
            let db = client.db(dbName);
            let cursor = db.collection('Users').find({email : mail}, { projection : { _id : 0, hash : 1}})
            result = await cursor.toArray();

            callback(result[0].hash);
        })
    }

    /**
     * @function Connection.isEmailExist
     * @param {String} mail
     * @param {Callback} callback 
     * Callback function to return the data to
     * @returns {}/
     * @description Execute a query to know if an email already exist
     */
    function checkEmail(mail, callback){
        let result = [];

        MongoClient.connect(url, async function(err, client){
            let db = client.db(dbName);
            let cursor = db.collection('Users').find({email : mail});
            result = await cursor.toArray();
            callback(Boolean(result.length));
        })
    }

    /**
     * @function Connection.checkRoom
     * @param {Number} nbFloor Room number "102, 108, 956..."
     * @param {String} nbBuild Letter from the building of the room "A,B,C"
     * @param {Callback} callback 
     * Callback function to return the data to
     * @returns {}/
     * @description Execute a query to know if a room exist
     */
    function checkRoom(nbFloor, nbBuild, callback){
        let result = [];

        MongoClient.connect(url, async function(err, client){
            let db = client.db(dbName);
            let cursor = db.collection('Rooms').find({floor: nbFloor, building: nbBuild});
            result = await cursor.toArray();
            callback(Boolean(result.length));
        })
    }

    /**
     * @function Connection.modifyRoom/Connection.modifyUser
     * @param {String} collection Name of the collection
     * @param {Object} elem Json object containing the conditions of the request
     * @param {Object} newElem Json object containing the keys and the new values of the elements to be modified
     * @returns {}/
     * @description Execute a query to modify a documentation of a collection
     */
    function change(collection, elem, newElem){
        MongoClient.connect(url, async function(err, client){
            let db = client.db(dbName);
            let cursor = db.collection(collection).find(elem);
            let result = await cursor.toArray();
            result = result[0];
            for(let key in newElem){
                result[key] = newElem[key];
            }

            db.collection(collection).findOneAndUpdate(elem, {"$set" : result});
        })
    }

    /**
     * @function Connection.deletBook/Connection.deletUser/Connection.deletUserWithMail
     * @param {String} collection Name of the collection
     * @param {Object} elem Json object containing the conditions of the request
     * @return {}/
     * @description Execute a query to remove documents from a collection
     */
    function suppr(collection, elem){
        MongoClient.connect(url, async function(err, client){
            let db = client.db(dbName);
            let cursor = db.collection(collection).deleteOne(elem);
        })
    }

    return {
        getRoom : (nbFloor, nbBuild, options, callback) => get("Rooms", {floor : nbFloor, building : nbBuild}, options, callback),
        getUser : (name, options, callback) => get("Users", {userName : name}, options, callback),
        getBook : (nbFloor, nbBuild, start, finish, options, callback) => get("Reservations", {floor : nbFloor, building: nbBuild, begin : start, end : finish}, options, callback),
        getRoomWithId : (id, options, callback) => get("Rooms", {_id : new ObjectId(id)}, options, callback),
        getUserWithId : (id, options, callback) => get("Users", {_id : new ObjectId(id)}, options, callback),
        getReservationWithId : (id, options, callback) => get("Reservations", {user :id}, options, callback),
        getUserWithMail : (mail, options, callback) => get("Users", {email : mail}, options, callback),
        newBook : (nbFloor, nbBuild, begin, end, duration, user, reason, callback) => book(nbFloor, nbBuild, begin, end, duration, user, reason, callback),
        newUser : (name, mail, mdp, admin, numClasse, callback) => addUser(name, mail, mdp, admin, numClasse, callback),
        getHash : (mail, callback) => userHash(mail, callback),
        isUserNameExist : (name, callback) => checkUserName(name, callback),
        isRoomExist : (nbFloor, nbBuild, callback) => checkRoom(nbFloor, nbBuild, callback),
        isEmailExist : (mail, callback) => checkEmail(mail, callback),
        modifyRoom : (nbFloor, nbBuild, newElem) => change("Rooms", {floor : nbFloor, building : nbBuild}, newElem),
        modifyUser : (name, newElem) => change("Users", {userName : name}, newElem),
        deletUser : (name) => suppr("Users", {userName : name}),
        deletUserWithMail : (mail) => suppr("Users", {email : mail}),
        deletBook : (nbFloor, nbBuild, start, finish, userId) => suppr("Reservations", {floor : nbFloor, building : nbBuild, begin : start, end : finish, user : userId}),
        allRoomFloor : (nbFloorMin, nbFloorMax, callback) => get("Rooms", {floor : {$lte : nbFloorMax, $gte : nbFloorMin}},{projection : {_id:0,planning:0,hasPlug :0}}, callback),
        allReservationDuring : (nbFloorMin, nbFloorMax, begin, end, callback) => get("Reservations", {floor : {$lte : nbFloorMax, $gte : nbFloorMin}, begin : {$lt : new Date(end)}, end : {$gt : new Date(begin)}}, {projection : {_id:0,user:0,duration:0}}, callback),
    };
})();

module.exports = { Connection };
