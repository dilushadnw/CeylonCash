# Code Documentation - CeylonCash

## Overview

This document explains the major components and structure of the CeylonCash budget tracking application.

## Architecture

### Technology Stack
- **React 19**: UI framework
- **Vite**: Build tool and dev server
- **Firebase**: Backend services
  - Firebase Authentication: User management
  - Firestore: NoSQL database for categories and expenses

### Project Structure

```
src/
├── components/           # React components
├── contexts/            # React contexts (state management)
├── config/              # Configuration files
├── App.jsx              # Main app component
└── main.jsx             # Application entry point
```

## Core Components

### 1. Authentication System

#### AuthContext.jsx
- **Purpose**: Manages user authentication state across the app
- **Key Functions**:
  - `signup(email, password)`: Creates new user account
  - `login(email, password)`: Authenticates existing user
  - `logout()`: Signs out current user
  - `currentUser`: Current authenticated user object

#### Login.jsx
- **Purpose**: User login interface
- **Features**:
  - Email/password input validation
  - Error message display
  - Toggle to signup form

#### Signup.jsx
- **Purpose**: New user registration
- **Features**:
  - Email/password validation
  - Password confirmation
  - Minimum 6 character requirement
  - Toggle to login form

### 2. Dashboard (Dashboard.jsx)

**Main application interface after login**

**Key Features**:
- Header with user email and logout button
- Category management section
- Expense summary with multiple views
- Recent expenses list
- Add expense modal

**Data Management**:
- Fetches user-specific categories from Firestore
- Fetches user-specific expenses from Firestore
- Real-time updates when data changes

### 3. Category Manager (CategoryManager.jsx)

**Purpose**: Create and manage expense categories

**Features**:
- Display existing categories as clickable buttons
- Add new category with inline form
- Each category click opens expense entry modal
- Categories stored per user in Firestore

**Data Structure**:
```javascript
{
  id: "auto-generated",
  name: "Category Name",
  userId: "user-uid",
  createdAt: "ISO timestamp"
}
```

### 4. Add Expense (AddExpense.jsx)

**Purpose**: Modal for adding new expenses

**Form Fields**:
- **Amount**: Numeric input (required)
- **Category**: Dropdown of user's categories (required)
- **Date**: Date picker, default today (required)
- **Description**: Text area (optional)

**Data Structure**:
```javascript
{
  id: "auto-generated",
  amount: 50.00,
  category: "Food",
  categoryId: "category-id",
  date: "2024-01-15",
  description: "Lunch at restaurant",
  userId: "user-uid",
  timestamp: 1705334400000,
  createdAt: "ISO timestamp"
}
```

### 5. Expense List (ExpenseList.jsx)

**Purpose**: Display and manage all expenses

**Features**:
- Lists expenses in reverse chronological order
- Shows: Category, Amount, Date, Description
- Edit functionality: Inline editing of any expense
- Delete functionality: Remove expenses
- Empty state when no expenses exist

**Operations**:
- `startEdit(expense)`: Enables edit mode for an expense
- `saveEdit(expenseId)`: Saves edited expense to Firestore
- `cancelEdit()`: Cancels editing without saving
- `onDelete(expenseId)`: Deletes expense from Firestore

### 6. Summary (Summary.jsx)

**Purpose**: Visualize expense data in multiple formats

**View Modes**:

1. **Total View**:
   - Total amount spent
   - Total number of transactions
   - Displayed in prominent card

2. **By Category**:
   - Sum of expenses per category
   - Percentage of total for each category
   - Sorted by highest amount first

3. **By Date**:
   - Daily expense summaries
   - Shows date and total amount
   - Sorted by most recent first

4. **Monthly**:
   - Aggregated monthly totals
   - Format: "Month Year"
   - Sorted by most recent month first

**Calculations**:
- Uses React `useMemo` for performance
- Recalculates only when expenses array changes

## Firebase Integration

### Configuration (firebase.js)

```javascript
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export authentication service
export const auth = getAuth(app);

// Export Firestore database
export const db = getFirestore(app);
```

### Firestore Collections

#### categories
```
/categories/{categoryId}
  - name: string
  - userId: string
  - createdAt: string
```

#### expenses
```
/expenses/{expenseId}
  - amount: number
  - category: string
  - categoryId: string
  - date: string (YYYY-MM-DD)
  - description: string
  - userId: string
  - timestamp: number (for sorting)
  - createdAt: string
```

### Security Rules

Users can only access their own data:
- Read/Write: Only if `userId` matches authenticated user ID
- Enforced at database level for security

## Styling

### CSS Architecture

Each component has its own CSS file for modularity:
- `Auth.css`: Login and signup styles
- `Dashboard.css`: Main dashboard layout
- `CategoryManager.css`: Category buttons and grid
- `AddExpense.css`: Modal and form styles
- `ExpenseList.css`: Expense items and editing
- `Summary.css`: Summary views and cards

### Design System

**Colors**:
- Primary Gradient: `#667eea` to `#764ba2`
- Success: `#4CAF50`
- Error: `#f44336`
- Background: `#f5f5f5`
- Text: `#333`, `#666`, `#999`

**Responsive Breakpoints**:
- Mobile: `max-width: 768px`
- Tablet/Desktop: `> 768px`

## Data Flow

1. **User Authentication**:
   ```
   User Input → Login/Signup → Firebase Auth → AuthContext → Dashboard
   ```

2. **Adding Category**:
   ```
   User Input → CategoryManager → Firestore addDoc → Refresh Categories
   ```

3. **Adding Expense**:
   ```
   Category Click → AddExpense Modal → Form Submit → Firestore addDoc → Refresh Expenses
   ```

4. **Viewing Summary**:
   ```
   Expenses Array → useMemo Calculations → Summary Component → Display
   ```

## Key Features Implementation

### 1. User-Specific Data Isolation

All Firestore queries include:
```javascript
where('userId', '==', currentUser.uid)
```

This ensures users only see their own data.

### 2. Real-Time Updates

After any create/update/delete operation:
```javascript
await fetchExpenses(); // Re-fetches latest data
```

### 3. Date Handling

- User inputs: `YYYY-MM-DD` format
- Storage: Timestamp for efficient sorting
- Display: Formatted with `toLocaleDateString()`

### 4. Error Handling

- Try-catch blocks around all Firebase operations
- User-friendly error messages
- Loading states during async operations

## Development Workflow

### Running Locally

```bash
npm run dev
# Opens at http://localhost:5173/CeylonCash/
```

### Building for Production

```bash
npm run build
# Creates optimized build in /dist
```

### Deployment

```bash
npm run deploy
# Builds and deploys to GitHub Pages
```

## Performance Considerations

1. **useMemo**: Summary calculations only run when expenses change
2. **Code Splitting**: Could be improved with React.lazy()
3. **Firestore Queries**: Indexed and filtered at database level
4. **CSS**: Minimal, component-scoped styles

## Future Enhancements

Potential improvements:
- Budget limits and alerts
- Charts/graphs for visualizations
- CSV export functionality
- Receipt photo uploads
- Multi-currency support
- Recurring expenses
- Budget goals and tracking
- Search and filter capabilities

## Testing the Application

### Manual Testing Checklist

1. **Authentication**:
   - [ ] Sign up with new email
   - [ ] Login with existing credentials
   - [ ] Logout functionality
   - [ ] Error handling for wrong password

2. **Categories**:
   - [ ] Add new category
   - [ ] Category persists after refresh
   - [ ] Categories display correctly

3. **Expenses**:
   - [ ] Add expense via category button
   - [ ] Edit existing expense
   - [ ] Delete expense
   - [ ] Validation works correctly

4. **Summary**:
   - [ ] Total view shows correct sum
   - [ ] Category view shows breakdown
   - [ ] Daily view groups by date
   - [ ] Monthly view aggregates correctly

5. **Responsive Design**:
   - [ ] Works on mobile (< 768px)
   - [ ] Works on tablet (768px - 1024px)
   - [ ] Works on desktop (> 1024px)

## Troubleshooting

### Firebase Connection Issues
- Verify configuration in `firebase.js`
- Check Firebase Console for service status
- Ensure Firestore security rules are published

### Build Errors
- Clear cache: `rm -rf node_modules dist`
- Reinstall: `npm install`
- Rebuild: `npm run build`

### Data Not Showing
- Check browser console for errors
- Verify user is authenticated
- Check Firestore security rules
- Ensure `userId` field is set correctly

---

**Note**: This is a client-side React application. All business logic runs in the browser, with Firebase handling backend services.
