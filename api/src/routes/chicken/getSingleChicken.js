const Api = require('../../server');
const express = require('express');
const router = express.Router();

// GET /chicken/:id
router.get('/:id', (req, res) => {
    const id = req.params.id
    getAllChicken(id, res);
});

async function getAllChicken(id, res) {
    try {

        // Perform the queru
        const query = {
            text: 'SELECT id, name, TO_CHAR(birthday, \'MM-DD-YY\') AS birthday, weight, steps, isRunning FROM chickens WHERE id = $1',
            values: [id],
        };
        const result = await Api.query(query);

        // If there is no result message
        if (result.rowCount < 1)
            return res.status(404).json({ msg: 'Chicken not found'});

        // If there is a result message
        return res.status(200).json(result.rows);

    // Check for error
    } catch (err) {
        return res.status(500).json({ msg: 'Internal server error'});
    }
}

module.exports = router;