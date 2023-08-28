const Api = require('../../server');
const express = require('express');
const router = express.Router();

// GET /chicken
router.get('/', (req, res) => {
    getAllChicken(res);
});

async function getAllChicken(res) {
    try {
        // Perform the query and format the birthday date to ISO 8601 to common date format
        const query = {
            text: 'SELECT id, name, TO_CHAR(birthday, \'MM-DD-YY\') AS birthday, weight, steps, isRunning FROM chickens'
        };
        const result = await Api.query(query);

        // If no result
        if (result.rowCount < 1)
            return res.status(404).json({ msg: 'No chickens found'});
        return res.status(200).json(result.rows);

    // Checking for error
    } catch (err) {
        return res.status(500).json({ msg: 'Internal server error'});
    }
}

module.exports = router;