import React, { useState } from 'react';
import './ExpenseList.css';

const ExpenseList = ({ expenses, categories, onDelete, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const startEdit = (expense) => {
    setEditingId(expense.id);
    setEditForm({
      amount: expense.amount,
      category: expense.category,
      categoryId: expense.categoryId,
      date: expense.date,
      description: expense.description || ''
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = (expenseId) => {
    onUpdate(expenseId, editForm);
    setEditingId(null);
    setEditForm({});
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  if (expenses.length === 0) {
    return (
      <div className="expense-list">
        <h2>Recent Expenses</h2>
        <div className="empty-state">
          <p>No expenses yet. Click on a category to add your first expense!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="expense-list">
      <h2>Recent Expenses</h2>
      <div className="expenses">
        {expenses.map((expense) => (
          <div key={expense.id} className="expense-item">
            {editingId === expense.id ? (
              <div className="expense-edit-form">
                <input
                  type="number"
                  step="0.01"
                  value={editForm.amount}
                  onChange={(e) => setEditForm({ ...editForm, amount: parseFloat(e.target.value) })}
                />
                <select
                  value={editForm.categoryId}
                  onChange={(e) => {
                    const cat = categories.find(c => c.id === e.target.value);
                    setEditForm({ 
                      ...editForm, 
                      categoryId: e.target.value,
                      category: cat.name 
                    });
                  }}
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  value={editForm.date}
                  onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                />
                <input
                  type="text"
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  placeholder="Description"
                />
                <div className="edit-actions">
                  <button onClick={() => saveEdit(expense.id)} className="btn-save-small">Save</button>
                  <button onClick={cancelEdit} className="btn-cancel-small">Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div className="expense-info">
                  <div className="expense-header">
                    <span className="expense-category">{expense.category}</span>
                    <span className="expense-amount">${expense.amount.toFixed(2)}</span>
                  </div>
                  <div className="expense-details">
                    <span className="expense-date">{formatDate(expense.date)}</span>
                    {expense.description && (
                      <span className="expense-description">{expense.description}</span>
                    )}
                  </div>
                </div>
                <div className="expense-actions">
                  <button onClick={() => startEdit(expense)} className="btn-edit">Edit</button>
                  <button onClick={() => onDelete(expense.id)} className="btn-delete">Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
