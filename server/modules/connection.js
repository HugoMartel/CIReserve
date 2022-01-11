const {MongoClient} = require('mongodb');
const { start } = require('repl');
const { from } = require('rxjs');

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
     * @function Connection.getRoom
     * @param {Object} elem 
     * @param {Object} options
     * @param {Callback} callback
     * Callback function to return the data to
     * @returns {} /
     * @description Execute a query to get information about a room
     */
    function getRoomCall(elem, options, callback) {
        let result = [];

        MongoClient.connect(url, async function(err, client) {
            let db = client.db(dbName);
            let cursor = db.collection('Rooms').find(elem, options);
            result = await cursor.toArray();
            callback(result);
        })

    }

    /**
     * @function Connection.newBook
     * @param {Number} nbFloor
     * @param {Number} nbBuild
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
            let cursor = db.collection('Reservations').insertOne({floor : nbFloor, building : nbBuild, begin : start, end : finish, duration : time, user : userId, reason : why})
        })
    }
    
    /**
     * @function Connection.newUser
     * @param {String} name 
     * @param {String} mdp 
     * @param {Boolean} admin 
     * @param {Number} numClasse
     * @returns {}/
     * @description Execute a query to add an user to the db
     */
    function addUser(name, mdp, admin, numClasse){
        MongoClient.connect(url, async function(err, client){
            let db = client.db(dbName);
            let cursor = db.collection('Users').insertOne({userName : name, hash : mdp, isAdmin : admin, classe : numClasse});
        })
    }

    /**
     * @function Connection.getHash
     * @param {String} name 
     * @param {Callback} callback 
     * Callback function to return the data to
     * @returns {}/
     * @description Execute a query to find the password
     */
    function userHash(name, callback){
        let result = [];

        MongoClient.connect(url, async function(err, client){
            let db = client.db(dbName);
            let cursor = db.collection('Users').find({userName : name}, { projection : { _id : 0, hash : 1}})
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
     * @function Connection.deletBook/Connection.deletUser
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

    return {
        getRoom : (nbFloor, nbBuild, options, callback) => getRoomCall({floor : nbFloor, building : nbBuild}, options, callback),
        newBook : (nbFloor, nbBuild, begin, end, duration, user, reason) => book(nbFloor, nbBuild, begin, end, duration, user, reason),
        newUser : (name, mdp, admin, numClasse) => addUser(name, mdp, admin, numClasse),
        getHash : (name, callback) => userHash(name, callback),
        isUserNameExist : (name, callback) => checkUserName(name, callback),
        modifyRoom : (nbFloor, nbBuild, newElem) => change("Rooms", {floor : nbFloor, building : nbBuild}, newElem),
        modifyUser : (name, newElem) => change("Users", {userName : name}, newElem),
        deletUser : (name) => suppr("Users", {userName : name}),
        deletBook : (nbFloor, nbBuild, start, finish, userId) => suppr("Reservations", {floor : nbFloor, building : nbBuild, begin : start, end : finish, user : userId}),

    };
})();

module.exports = { Connection };
