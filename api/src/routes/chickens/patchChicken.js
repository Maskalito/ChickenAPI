const Api = require('../../api');
const express = require('express');
const router = express.Router();

// PATCH /chicken/id
router.patch('/:chickenId', (req, res) => {
    const chickenId = req.params.chickenId;
    const updatedFields = req.body;

    // Check if the body is filled
    if (Object.keys(updatedFields).length === 0)
        return res.status(400).json({ msg: 'No fields provided' });

    patchChicken(chickenId, updatedFields, res);
});

async function patchChicken(chickenId, updatedFields, res) {
    try {

        // Set arrays for the keys and the values
        const setClauses = [];
        const values = [];

        // Loop throught the body to add every values in the query with there associated index
        Object.keys(updatedFields).forEach((key, index) => {
            setClauses.push(`${key} = $${index + 1}`);
            values.push(updatedFields[key]);
        });

        // Use join to respect the sql writing standard
        // chickenId at the end of value because its index equals the lenght of values plus one
        const query = {
            text: `UPDATE chickens SET ${setClauses.join(', ')} WHERE id = $${values.length + 1} RETURNING id`,
            values: [...values, chickenId],
        };

        const result = await Api.query(query);

        // If there is a result
        if (result.rowCount === 1) {

            // Get the Id for the response
            const chickenUpdated = result.rows[0].id;
            return res.status(200).json({ msg: 'Chicken successfully updated', chickenId: chickenUpdated});
        } else {
            return res.status(404).json({ msg: 'Chicken not found' });
        }
    // Checking for error
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Internal server error'});
    }
}

module.exports = router;