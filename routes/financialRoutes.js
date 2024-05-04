const express = require('express');
const router = express.Router();
const operations = require('../data/financialOperations'); // Array from an external file

// Get all financial operations
router.get('/', (req, res) => {
    res.json(operations); // Return all operations
});

// Add a new financial operation
router.post('/', (req, res) => {
    const { name, description, time, amount, currency } = req.body;
    if (!name || !amount || !currency) {
        return res.status(400).json({ error: 'Name, amount, and currency are required' });
    }
    const newOperation = {
        id: operations.length + 1,
        name,
        description,
        time: time || new Date().toISOString(),
        amount,
        currency
    };
    operations.push(newOperation);
    res.status(201).json(newOperation);
});

module.exports = router;

