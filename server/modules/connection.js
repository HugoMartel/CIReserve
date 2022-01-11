const {MongoClient} = require('mongodb');

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
    const dbName = 'temp';
   

    /**
     * @function Connection.getRoom
     * @param {Object} roomNumber
     * @param {Callback} callback
     * Callback function to return the data to
     * @returns {} /
     * @description Execute a query to get information about a room
     */
    function getRoomCall(/*roomNumber,*/ callback) {
        let result = [];

        MongoClient.connect(url, async function(err, client) {
            console.log("Connected successfully to BDD");
            let db = client.db(dbName);
            let cursor = db.collection('temp2').find({});
            result = await cursor.toArray();
            callback(result);
        })

    }
    

    return {
        getRoom: (/*arg, */callback) => getRoomCall(/*arg, */callback),

    };
})();

module.exports = { Connection };
