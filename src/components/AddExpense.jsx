import React, { useState } from 'react';
import './AddExpense.css';

const AddExpense = ({ category, categories, onAdd, onClose }) => {
  const today = new Date().toISOString().split('T')[0];
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category?.id || '');
  const [date, setDate] = useState(today);
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!amount || !selectedCategory || !date) {
      alert('Please fill in required fields');
      return;
    }

    const selectedCat = categories.find(c => c.id === selectedCategory);
    
    onAdd({
      amount: parseFloat(amount),
      category: selectedCat.name,
      categoryId: selectedCategory,
      date: date,
      description: description,
      createdAt: new Date().toISOString()
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Expense</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Amount *</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
            />
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Date *</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              max={today}
              required
            />
          </div>

          <div className="form-group">
            <label>Description (Optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a note about this expense"
              rows="3"
            />
          </div>

          <div className="modal-actions">
            <button type="submit" className="btn-primary">Add Expense</button>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
