const Api = require('../../server');
const express = require('express');
const router = express.Router();

// PUT /chicken/id
router.put('/:chickenId', (req, res) => {
    const chickenId = req.params.chickenId;
    const { name, birthday, weight, steps, isRunning} = req.body;

    // Checking if each field is filled
    if (!name || !birthday || !weight || !steps || !isRunning)
        return res.status(400).json({ msg: "Fields name, birthday, weight, steps and isRunning are mandatory to perform a put request. If you do not want to use theses fields, please use patch request." });

    putChicken(chickenId, { name, birthday, weight, steps, isRunning }, res);
});

async function putChicken(chickenId, chickenData, res) {
    try {
        // Perform the query
        const query = {
            text: "UPDATE chickens SET name = $1, birthday = $2, weight = $3, steps = $4, isRunning = $5 WHERE id = $6 RETURNING id",
            values: [chickenData.name, chickenData.birthday, chickenData.weight, chickenData.steps, chickenData.isRunning, chickenId],
        }
        const result = await Api.query(query);

        // If there is a result
        if (result.rowCount === 1) {
            return res.status(200).json({ msg: "Chicken successfully updated" });
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