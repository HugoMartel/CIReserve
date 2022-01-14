# CIReserve
Small project made in one week that aims to create a website (and maybe apps ?) to check if classes are available to book in our school.

## Run the project:

First run `npm install` to setup the project, then run `ng build` to generate a static site, then `npm start` to start the [Express](https://expressjs.com/) webserver

## Build with
- [angular cli](https://github.com/angular/angular-cli) to cross compile etc
- [MongoDB](https://www.mongodb.com) to run the database
- [notify](https://notiflix.github.io/notify) in order to show some sweet notification
- [express](https://www.npmjs.com/package/express) to run the back-end serv
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) to hash users passwords

## Generate documentation
Run `jsdoc -d ./doc --readme README.md -c jsdoc.json -r --verbose`, this will generate documentation in `./doc` folder.
