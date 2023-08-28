const express = require('express');
const router = express.Router();
const Api = require('../../server');

// PATCH /chicken/run
router.patch('/', (req, res) => {
    let chickenId = req.body.chickenId;
    if (!chickenId) {
        return res.status(400).json({ msg: 'Chicken ID is required' });
    }
    runChicken(chickenId, res);
});

async function runChicken(chickenId, res) {
    try {
        // Perform the query
        const query = {
            text: 'UPDATE chickens SET steps = steps + 1 WHERE id = $1',
            values: [chickenId],
        }
        const result = await Api.query(query);

        // If there is no result
        if (result.rowCount === 0) {
            return res.status(404).json({ msg: 'Chicken not found' });
        }
        return res.status(200).json({ msg: 'Your chicken has taken a step forward!' });
    // Checking for error
    } catch (err) {
        console.error('Error updating chicken steps:', err);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
}

module.exports = router;