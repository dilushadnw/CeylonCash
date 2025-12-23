import React, { useState, useMemo } from 'react';
import './Summary.css';

const Summary = ({ expenses, categories }) => {
  const [viewMode, setViewMode] = useState('total'); // total, category, daily, monthly

  // Calculate total expenses
  const totalExpenses = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  // Calculate expenses by category
  const expensesByCategory = useMemo(() => {
    const categoryTotals = {};
    expenses.forEach((expense) => {
      if (!categoryTotals[expense.category]) {
        categoryTotals[expense.category] = 0;
      }
      categoryTotals[expense.category] += expense.amount;
    });
    return Object.entries(categoryTotals)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);
  }, [expenses]);

  // Calculate expenses by date
  const expensesByDate = useMemo(() => {
    const dateTotals = {};
    expenses.forEach((expense) => {
      const date = expense.date;
      if (!dateTotals[date]) {
        dateTotals[date] = 0;
      }
      dateTotals[date] += expense.amount;
    });
    return Object.entries(dateTotals)
      .map(([date, amount]) => ({ date, amount }))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [expenses]);

  // Calculate monthly summary
  const monthlyExpenses = useMemo(() => {
    const monthTotals = {};
    expenses.forEach((expense) => {
      const date = new Date(expense.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!monthTotals[monthKey]) {
        monthTotals[monthKey] = 0;
      }
      monthTotals[monthKey] += expense.amount;
    });
    return Object.entries(monthTotals)
      .map(([month, amount]) => ({ month, amount }))
      .sort((a, b) => b.month.localeCompare(a.month));
  }, [expenses]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatMonth = (monthString) => {
    const [year, month] = monthString.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="summary">
      <div className="summary-header">
        <h2>Summary</h2>
        <div className="view-toggle">
          <button 
            className={viewMode === 'total' ? 'active' : ''}
            onClick={() => setViewMode('total')}
          >
            Total
          </button>
          <button 
            className={viewMode === 'category' ? 'active' : ''}
            onClick={() => setViewMode('category')}
          >
            By Category
          </button>
          <button 
            className={viewMode === 'daily' ? 'active' : ''}
            onClick={() => setViewMode('daily')}
          >
            By Date
          </button>
          <button 
            className={viewMode === 'monthly' ? 'active' : ''}
            onClick={() => setViewMode('monthly')}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="summary-content">
        {viewMode === 'total' && (
          <div className="total-summary">
            <div className="total-card">
              <h3>Total Expenses</h3>
              <p className="total-amount">${totalExpenses.toFixed(2)}</p>
              <p className="total-count">{expenses.length} transactions</p>
            </div>
          </div>
        )}

        {viewMode === 'category' && (
          <div className="category-summary">
            {expensesByCategory.length === 0 ? (
              <p className="empty-message">No expenses yet</p>
            ) : (
              expensesByCategory.map(({ category, amount }) => (
                <div key={category} className="summary-row">
                  <span className="summary-label">{category}</span>
                  <span className="summary-value">${amount.toFixed(2)}</span>
                  <span className="summary-percent">
                    {((amount / totalExpenses) * 100).toFixed(1)}%
                  </span>
                </div>
              ))
            )}
          </div>
        )}

        {viewMode === 'daily' && (
          <div className="date-summary">
            {expensesByDate.length === 0 ? (
              <p className="empty-message">No expenses yet</p>
            ) : (
              expensesByDate.map(({ date, amount }) => (
                <div key={date} className="summary-row">
                  <span className="summary-label">{formatDate(date)}</span>
                  <span className="summary-value">${amount.toFixed(2)}</span>
                </div>
              ))
            )}
          </div>
        )}

        {viewMode === 'monthly' && (
          <div className="monthly-summary">
            {monthlyExpenses.length === 0 ? (
              <p className="empty-message">No expenses yet</p>
            ) : (
              monthlyExpenses.map(({ month, amount }) => (
                <div key={month} className="summary-row">
                  <span className="summary-label">{formatMonth(month)}</span>
                  <span className="summary-value">${amount.toFixed(2)}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary;
