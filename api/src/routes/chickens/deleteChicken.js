const Api = require('../../api');
const express = require('express');
const router = express.Router();

// DELETE /chicken/:id
router.delete('/:chickenId', (req, res) => {
    // Get the Id from the URL
    const chickenId = req.params.chickenId;
    deleteChicken(chickenId, res);
});

async function deleteChicken(chickenId, res) {
    try {
        // Perform the query
        const query = {
            text: 'DELETE FROM chickens WHERE id = $1 RETURNING id',
            values: [chickenId],
        };
        const result = await Api.query(query);

        // If there is a result
        if (result.rowCount === 1) {
            const chickenDelete = result.rows[0].id;
            return res.status(200).json({ msg: 'Chicken successfully deleted', chickenId: chickenDelete});
        // If there is no result
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