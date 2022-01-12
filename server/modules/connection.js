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
     * @function Connection.getRoom/Connection.getUser/Connection.getBook/Connection.getRoomWithId/Connection.getUserWithId/Connection.getBookWithId/Connection.getUserWithMail
     * @param {String} collection
     * @param {Object} elem 
     * @param {Object} options
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
     * @param {Number} nbFloor
     * @param {String} nbBuild
     * @param {Date} start
     * @param {Date} finish 
     * @param {Number} time
     * @param {String} userId 
     * @param {String} Why 
     * @returns {}/
     * @description Execute a query to book a room
     */
    function book(nbFloor, nbBuild, start, finish, time, userId, why){
        MongoClient.connect(url, async function(err, client){
            let db = client.db(dbName);
            let cursor = db.collection('Reservations').insertOne({begin : start, end : finish, duration : time, user : userId, reason : why, building : nbBuild, floor : nbFloor})
        })
    }
    
    /**
     * @function Connection.newUser
     * @param {String} name 
     * @param {String} mail
     * @param {String} mdp 
     * @param {Boolean} admin 
     * @param {Number} numClasse
     * @returns {}/
     * @description Execute a query to add an user to the db
     */
    function addUser(name, mail, mdp, admin, numClasse){
        MongoClient.connect(url, async function(err, client){
            let db = client.db(dbName);
            let cursor = db.collection('Users').insertOne({userName : name, isAdmin : admin, classe : numClasse, hash : mdp, email : mail});
        })
    }

    /**
     * @function Connection.getHash
     * @param {String} mail 
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
     * @function Connection.isUserNameExist
     * @param {String} name 
     * @param {Callback} callback 
     * Callback function to return the data to
     * @returns {}/
     * @description Execute a query to know if a userName already exist
     */
    function checkUserName(name, callback){
        let result = [];

        MongoClient.connect(url, async function(err, client){
            let db = client.db(dbName);
            let cursor = db.collection('Users').find({userName : name});
            result = await cursor.toArray();
            callback(Boolean(result.length));
        })
    }

    /**
     * @function Connection.modifyRoom/Connection.modifyUser
     * @param {String} collection 
     * @param {Object} elem 
     * @param {Object} newElem 
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
     * @param {String} collection 
     * @param {Object} elem 
     * @return {}/
     * @description Execute a query to remove documents from a collection
     */
    function suppr(collection, elem){
        MongoClient.connect(url, async function(err, client){
            let db = client.db(dbName);
            let cursor = db.collection(collection).deleteOne(elem);
        })
    }

    /**
     * @function Connection.allRoomFloor
     * @param {Number} nbFloor 
     * @param {Callback} callback 
     * Callback function to return the data to
     * @returns {}/
     * @description Exucte a query to get all room of a specifyed floor
     */
    function getRoomFloor(nbFloor, callback){
        let min = nbFloor * 100;
        let max = (nbFloor+1) * 100;
        
        get("Rooms", {floor : {$lte : max, $gte : min}},{projection : {_id:0}}, callback);
    }

    /**
     * @function Connection.allReservationAt
     * @param {Number} nbFloor 
     * @param {Date} time 
     * @param {Callback} callback 
     * Callback function to return the data to
     * @returns {}/
     * @description Execute a query to get all reservation for a specifyed floor at a specifyed time
     */
    function getReservationAt(nbFloor, time, callback){
        let min = nbFloor * 100;
        let max = (nbFloor+1) * 100;
        get("Reservations", {floor : {$lte : max, $gte : min}, begin : {$lte : time}, end : {$gte : time}}, {projection : {_id:0}}, callback);
    }

    return {
        getRoom : (nbFloor, nbBuild, options, callback) => get("Rooms", {floor : nbFloor, building : nbBuild}, options, callback),
        getUser : (name, options, callback) => get("Users", {userName : name}, options, callback),
        getBook : (nbFloor, nbBuild, start, finish, options, callback) => get("Reservations", {floor : nbFloor, building: nbBuild, begin : start, end : finish}, options, callback),
        getRoomWithId : (id, options, callback) => get("Rooms", {_id : new ObjectId(id)}, options, callback),
        getUserWithId : (id, options, callback) => get("Users", {_id : new ObjectId(id)}, options, callback),
        getReservationWithId : (id, options, callback) => get("Reservations", {_id : new ObjectID(id)}, options, callback),
        getUserWithMail : (mail, options, callback) => get("Users", {email : mail}, options, callback),
        newBook : (nbFloor, nbBuild, begin, end, duration, user, reason) => book(nbFloor, nbBuild, begin, end, duration, user, reason),
        newUser : (name, mail, mdp, admin, numClasse) => addUser(name, mail, mdp, admin, numClasse),
        getHash : (mail, callback) => userHash(mail, callback),
        isUserNameExist : (name, callback) => checkUserName(name, callback),
        modifyRoom : (nbFloor, nbBuild, newElem) => change("Rooms", {floor : nbFloor, building : nbBuild}, newElem),
        modifyUser : (name, newElem) => change("Users", {userName : name}, newElem),
        deletUser : (name) => suppr("Users", {userName : name}),
        deletUserWithMail : (mail) => suppr("Users", {email : mail}),
        deletBook : (nbFloor, nbBuild, start, finish, userId) => suppr("Reservations", {floor : nbFloor, building : nbBuild, begin : start, end : finish, user : userId}),        
        allRoomFloor : (nbFloor, callback) => getRoomFloor(nbFloor, callback),
        allReservationAt : (nbFloor, time, callback) => getReservationAt(nbFloor, time, callback),
    };
})();

module.exports = { Connection };
