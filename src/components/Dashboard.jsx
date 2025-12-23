import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../config/firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  deleteDoc,
  doc,
  updateDoc,
  orderBy 
} from 'firebase/firestore';
import CategoryManager from './CategoryManager';
import AddExpense from './AddExpense';
import ExpenseList from './ExpenseList';
import Summary from './Summary';
import './Dashboard.css';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch categories from Firestore
  const fetchCategories = async () => {
    try {
      const q = query(
        collection(db, 'categories'),
        where('userId', '==', currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const categoriesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch expenses from Firestore
  const fetchExpenses = async () => {
    try {
      const q = query(
        collection(db, 'expenses'),
        where('userId', '==', currentUser.uid),
        orderBy('timestamp', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const expensesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setExpenses(expensesData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setLoading(false);
    }
  };

  // Load data on mount
  useEffect(() => {
    if (currentUser) {
      fetchCategories();
      fetchExpenses();
    }
  }, [currentUser]);

  // Add new category
  const addCategory = async (categoryName) => {
    try {
      await addDoc(collection(db, 'categories'), {
        name: categoryName,
        userId: currentUser.uid,
        createdAt: new Date().toISOString()
      });
      await fetchCategories();
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  // Add new expense
  const addExpense = async (expenseData) => {
    try {
      await addDoc(collection(db, 'expenses'), {
        ...expenseData,
        userId: currentUser.uid,
        timestamp: new Date(expenseData.date).getTime()
      });
      await fetchExpenses();
      setShowAddExpense(false);
      setSelectedCategory(null);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  // Delete expense
  const deleteExpense = async (expenseId) => {
    try {
      await deleteDoc(doc(db, 'expenses', expenseId));
      await fetchExpenses();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  // Update expense
  const updateExpense = async (expenseId, updatedData) => {
    try {
      await updateDoc(doc(db, 'expenses', expenseId), {
        ...updatedData,
        timestamp: new Date(updatedData.date).getTime()
      });
      await fetchExpenses();
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  // Handle category button click
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowAddExpense(true);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>CeylonCash</h1>
        <div className="user-info">
          <span>{currentUser.email}</span>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        <CategoryManager 
          categories={categories}
          onAddCategory={addCategory}
          onCategoryClick={handleCategoryClick}
        />

        <Summary expenses={expenses} categories={categories} />

        <ExpenseList 
          expenses={expenses}
          categories={categories}
          onDelete={deleteExpense}
          onUpdate={updateExpense}
        />

        {showAddExpense && (
          <AddExpense
            category={selectedCategory}
            categories={categories}
            onAdd={addExpense}
            onClose={() => {
              setShowAddExpense(false);
              setSelectedCategory(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
