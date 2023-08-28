const Api = require('../../api');
const express = require('express');
const router = express.Router();

// POST /chicken
router.post('/', (req, res) => {

    // Get the parameters
    let { name, birthday, weight, steps, isRunning} = req.body

    // Check the validity of the parameters
    if (!name)
        return res.status(400).json({ msg: "Your chicken need a name!" });
    if (!weight)
        return res.status(400).json({ msg: "Your chicken need a weight!" });
    if (!birthday)
        return res.status(400).json({ msg: "Your chicken need a birthday!" });
    if (!steps)
        steps = 0;
    if (!isRunning)
        isRunning = false;
    addChicken({ name, birthday, weight, steps, isRunning }, res);
});

async function addChicken(chickenData, res) {
    try {

        // Perform the query
        const query = {
            text: 'INSERT INTO chickens (name, birthday, weight, steps, isRunning) VALUES ($1, $2, $3, $4, $5) RETURNING id',
            values: [chickenData.name, chickenData.birthday, chickenData.weight, chickenData.steps, chickenData.isRunning],
        };
        const result = await Api.query(query);

        // If there is a result message
        if (result.rowCount === 1) {
            const newChickenId = result.rows[0].id;
            return res.status(201).json({ msg: 'Chicken added successfully', chickenId: newChickenId });
        } else {

            // If there is no result message
            return res.status(500).json({ msg: 'Error adding chicken' });
        }
    } catch (err) {

        // Check for specific error code
        if (err.code === '23505') {
            return res.status(412).json({ msg: "This chicken already exists." });
        } else if (err.code === '22007') {
            return res.status(403).json({ msg: 'Please use the requested birthday date format.'});
        } else if (err.code === '22P02') {
            return res.status(400).json({ msg: 'Please use an integer or float number for the wheigt and the steps.'});

        // Check for other errors
        } else {
            console.error('Error adding chicken:', err);
            return res.status(500).json({ msg: 'Internal server error'});
        }
    }
}

module.exports = router;