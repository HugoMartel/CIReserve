/**
 * @file Main page of the project, start the webserver by executing it
 * @author CIReserve
 * @version 1.0.0
 */

 const fs = require("fs");
 const { validationResult } = require('express-validator');

/**
 * Process the POST and GET requests from the express app in index.js
 * @type {Object}
 * @return {Object} functions to use with the Request module
 * @name Request
 * @namespace Request
 */
const Request = (function() {

    /**
    * @function AppRequest.register
    * @param {Object} request
    * user's request
    * @param {Object} response
    * server's response
    * @returns {} /
    * @description POST request handler for an user registration to the site
    */
     let registerCall = (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          console.log(errors);
          return res.status(400).json({ errors: errors.array() });
        } else {
          //Get XMLHttpRequests values
          let passwordChecked = req.body.password;
          let usernameChecked = escape(req.body.username.trim());

          // Check if the credentials are correct
          if (
            usernameChecked.length > 3 &&
            passwordChecked.length > 8 &&
            /[0-9]/.test(passwordChecked) &&
            /[A-Z]/.test(passwordChecked) &&
            /[a-z]/.test(passwordChecked)
          ) {
            //TODO
            //if (! username already exist in database) {add user in database}
          } else {
            console.log("Wrong logins credentials...");
            res.json({ error: "Wrong logins credentials..." });
          }
        }
      };

//===============================================================================
    /**
    * @function AppRequest.login
    * @param {Object} request
    * user's request
    * @param {Object} response
    * server's response
    * @returns {} /
    * @description POST request handler for an user connection to his account
    */
    let loginCall = (req, res) => {
        const errors = validationResult(req);

        if (
            !errors.isEmpty() ||
            !(req.body.username === 'string') ||
            !(req.body.password === 'string')
        ) {
            //console.log(errors, req.body.username, req.body.password);//! DEBUG
            return res.status(400).json({ errors: errors.array() });
        } else {
            let usernameChecked = escape(req.body.username.trim());
            let passwordChecked = req.body.password;

            //TODO
            //check in database
        }
    };


//===============================================================================
//===============================================================================
    return {
        register: (req, res) => registerCall(req, res),
    };
})();

module.exports = { Request };
