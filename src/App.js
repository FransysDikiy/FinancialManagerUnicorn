import React, { useEffect, useState } from 'react';
import './App.css';
import OperationForm from './OperationForm';

function App() {
  const [operations, setOperations] = useState([]);
  const [totals, setTotals] = useState({ totalExpenses: 0, totalIncome: 0 });

  // Function to fetch operations from the backend
  useEffect(() => {
    fetch('http://localhost:3000/api/operations')
      .then(response => response.json())
      .then(data => {
        setOperations(data.operations);
        setTotals(data.totals);
      })
      .catch(error => console.error('Error fetching operations:', error));
  }, []);

  // Function to add a new operation
  const addOperation = operation => {
    fetch('http://localhost:3000/api/operations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(operation)
    })
    .then(response => response.json())
    .then(data => {
      setOperations([...operations, data.operation]);
      setTotals({
        totalExpenses: totals.totalExpenses + (operation.tags.includes('expense') ? parseFloat(operation.amount) : 0),
        totalIncome: totals.totalIncome + (operation.tags.includes('income') ? parseFloat(operation.amount) : 0),
      });
    })
    .catch(error => console.error('Error adding operation:', error));
  };

  return (
    <div className="App">
      <h1>Financial Manager</h1>
      <OperationForm addOperation={addOperation} />
      <h2>Operations</h2>
      {operations.map((op, index) => (
        <div key={index}>
          <p>Name: {op.name}</p>
          <p>Date: {op.date}</p>
          <p>Amount: {op.amount} {op.currency}</p>
          <p>Description: {op.description}</p>
          <p>Tags: {op.tags.join(', ')}</p>
        </div>
      ))}
      <h3>Total Expenses: {totals.totalExpenses}</h3>
      <h3>Total Income: {totals.totalIncome}</h3>
    </div>
  );
}

export default App;
