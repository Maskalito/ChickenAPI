const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

// Config port and env variable with dotenv
dotenv.config();
const port = 3001;

// Call cors and express json
app.use(cors());
app.use(express.json());

// Import the routes
const chickenRoute = require('./routes/chickens');
const singleChickenRoute = require('./routes/chicken/getSingleChicken');
const runRoute = require('./routes/run/runChicken');

// Add them to the app
app.use('/chicken/run', runRoute);
app.use('/chicken', chickenRoute);
app.use('/chicken', singleChickenRoute);

// Return page not found for any other route
app.get("*", function(req, res) {
    return res.status(404).json({ msg: 'page not found'});
})

app.listen(port, () => {
    console.log(`Back listening at http://localhost:${port}`);
})