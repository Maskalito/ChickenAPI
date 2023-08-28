const { Client } = require('pg');

// Setup the connexion with the database
const Api = new Client ({
    user: process.env.CHICKEN_USER,
    host: process.env.CHICKEN_HOST,
    database: process.env.CHICKEN_DATABASE,
    password: process.env.CHICKEN_PASSWORD,
    port: process.env.CHICKEN_PORT,
});

// Run the connexion
Api.connect(function(err) {
    if (err) {
        console.error('Connection failed : ', err);
        process.exit(1);
    }
    console.log('Database connected')
})

module.exports = Api;