import React, { useState } from 'react';
import './CategoryManager.css';

const CategoryManager = ({ categories, onAddCategory, onCategoryClick }) => {
  const [showInput, setShowInput] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newCategory.trim()) {
      onAddCategory(newCategory.trim());
      setNewCategory('');
      setShowInput(false);
    }
  };

  return (
    <div className="category-manager">
      <h2>Expense Categories</h2>
      <div className="categories-grid">
        {categories.map((category) => (
          <button
            key={category.id}
            className="category-btn"
            onClick={() => onCategoryClick(category)}
          >
            {category.name}
          </button>
        ))}
        
        {showInput ? (
          <form onSubmit={handleSubmit} className="add-category-form">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Category name"
              autoFocus
              maxLength={20}
            />
            <div className="form-buttons">
              <button type="submit" className="btn-save">Add</button>
              <button 
                type="button" 
                className="btn-cancel"
                onClick={() => {
                  setShowInput(false);
                  setNewCategory('');
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            className="category-btn add-new"
            onClick={() => setShowInput(true)}
          >
            + Add Category
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryManager;
