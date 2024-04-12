const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

// In-memory storage of financial operations
let financialOperations = [];

// API endpoint to get all financial operations
app.get('/api/operations', (req, res) => {
    const totals = calculateTotals();
    res.json({ operations: financialOperations, totals });
});

// API endpoint to add a new financial operation
app.post('/api/operations', (req, res) => {
    const { name, date, amount, currency, description, tags } = req.body;
    const newOperation = { name, date, amount, currency, description, tags };
    financialOperations.push(newOperation);
    res.status(201).send({ message: 'Operation added successfully', operation: newOperation });
});

// Utility function to calculate totals for expenses and incomes
function calculateTotals() {
    let totalExpenses = 0;
    let totalIncome = 0;

    financialOperations.forEach(op => {
        if (op.tags.includes('expense')) {
            totalExpenses += parseFloat(op.amount);
        } else if (op.tags.includes('income')) {
            totalIncome += parseFloat(op.amount);
        }
    });

    return { totalExpenses, totalIncome };
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
