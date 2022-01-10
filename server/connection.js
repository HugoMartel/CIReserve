const {MongoClient} = require('mongodb');

 const Request = (function() {
    
    /* Init Code */    
    const url = 'mongodb://localhost:27017';
    const dbName = 'temp';

    // Connect to the temp db
    MongoClient.connect(url, function(err, client) {
        console.log("Connected successfully to server");
        db = client.db(dbName);
    });

    

    /**
     * @function AppRequest.testFunc
     * @param {Object} request
     * user's request
     * @param {Object} response
     * server's response
     * @returns {} /
     * @description GET request handler for the site's main page
     */
    function getRoomCall() {
        let cursor = db.collection('temp2').find({}, {"_id" : 0});

        console.log(JSON.parse(cursor));
    }
    

    return {
        getRoom: () => getRoomCall(),
        exit : () => db.close(),
    };
})();

module.exports = { Request };