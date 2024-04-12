import React, { useState } from 'react';

function OperationForm({ addOperation }) {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    amount: '',
    currency: '',
    description: '',
    tags: []
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    addOperation({ ...formData, tags: formData.tags.split(',') });
    setFormData({
      name: '',
      date: '',
      amount: '',
      currency: '',
      description: '',
      tags: []
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" required />
      <input type="text" name="currency" value={formData.currency} onChange={handleChange} placeholder="Currency" required />
      <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
      <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="Tags (comma-separated)" />
      <button type="submit">Add Operation</button>
    </form>
  );
}

export default OperationForm;
