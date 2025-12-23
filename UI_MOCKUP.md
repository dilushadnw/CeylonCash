# CeylonCash - UI Mockup Guide

## Application Flow

### 1. Login Screen
![Login Screen](https://github.com/user-attachments/assets/3dd3d5fe-22a7-4d05-9fb8-cbfe34c89529)

**Features**:
- Email and password input fields
- Login button
- Link to sign up page
- Clean gradient background
- Centered card layout

---

### 2. Sign Up Screen
![Sign Up Screen](https://github.com/user-attachments/assets/f219397a-31f3-4b07-8e65-0388f27433f6)

**Features**:
- Email input
- Password input with 6 character minimum
- Confirm password field
- Sign up button
- Link back to login page
- Same beautiful gradient design

---

### 3. Dashboard (After Login)

**Layout Structure**:

```
┌─────────────────────────────────────────────────────────┐
│  CeylonCash                    user@email.com  [Logout] │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Expense Categories                                     │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌────────────┐  │
│  │ Food │ │ Bus  │ │ Rent │ │Internet│ │ + Add      │  │
│  └──────┘ └──────┘ └──────┘ └──────┘ │   Category │  │
│                                        └────────────┘  │
│                                                         │
│  Summary                    [Total] [By Category]      │
│  ┌──────────────────────┐   [By Date] [Monthly]       │
│  │  Total Expenses      │                              │
│  │     $1,234.56        │                              │
│  │   15 transactions    │                              │
│  └──────────────────────┘                              │
│                                                         │
│  Recent Expenses                                        │
│  ┌─────────────────────────────────────────────────┐  │
│  │ Food               $25.50      [Edit] [Delete]  │  │
│  │ Dec 23, 2024 - Grocery shopping                 │  │
│  ├─────────────────────────────────────────────────┤  │
│  │ Bus                $5.00       [Edit] [Delete]  │  │
│  │ Dec 22, 2024 - Daily commute                    │  │
│  ├─────────────────────────────────────────────────┤  │
│  │ Internet           $50.00      [Edit] [Delete]  │  │
│  │ Dec 20, 2024 - Monthly bill                     │  │
│  └─────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

### 4. Add Expense Modal (Clicking a Category)

```
           ┌──────────────────────────┐
           │ Add Expense          [×] │
           ├──────────────────────────┤
           │                          │
           │ Amount *                 │
           │ [_______________]        │
           │                          │
           │ Category *               │
           │ [Food           ▼]       │
           │                          │
           │ Date *                   │
           │ [2024-12-23    📅]       │
           │                          │
           │ Description (Optional)   │
           │ [_______________]        │
           │ [_______________]        │
           │                          │
           │ [Add Expense] [Cancel]   │
           └──────────────────────────┘
```

---

### 5. Summary Views

#### Total View
```
┌──────────────────────┐
│  Total Expenses      │
│    $1,234.56         │
│  15 transactions     │
└──────────────────────┘
```

#### By Category View
```
Food             $450.00      36.4%
Rent             $500.00      40.5%
Bus              $150.00      12.1%
Internet          $50.00       4.0%
Other             $84.56       6.8%
```

#### By Date View
```
Dec 23, 2024     $125.50
Dec 22, 2024      $45.00
Dec 21, 2024     $200.00
Dec 20, 2024      $50.00
```

#### Monthly View
```
December 2024    $1,234.56
November 2024      $987.65
October 2024     $1,123.45
```

---

## Color Scheme

- **Primary Gradient**: Purple to Blue (`#667eea` → `#764ba2`)
- **Background**: Light Gray (`#f5f5f5`)
- **Cards**: White with shadow
- **Text**: Dark Gray (`#333`)
- **Success**: Green (`#4CAF50`)
- **Error**: Red (`#f44336`)

---

## Responsive Design

### Desktop (> 768px)
- Full layout as shown above
- Multi-column category grid
- Side-by-side expense display

### Mobile (< 768px)
- Stacked layout
- Single column categories
- Full-width expense cards
- Collapsible summary views
- Larger touch targets

---

## User Interactions

### 1. Adding a Category
1. Click "+ Add Category" button
2. Inline input appears
3. Type category name
4. Click "Add" or press Enter
5. Category appears as new button

### 2. Adding an Expense
1. Click any category button (e.g., "Food")
2. Modal opens with category pre-selected
3. Enter amount (required)
4. Select/confirm category
5. Choose date (default: today)
6. Add optional description
7. Click "Add Expense"
8. Expense appears in list and summary updates

### 3. Editing an Expense
1. Find expense in "Recent Expenses"
2. Click "Edit" button
3. Inline editing form appears
4. Modify any field
5. Click "Save" to update or "Cancel" to discard

### 4. Deleting an Expense
1. Find expense in "Recent Expenses"
2. Click "Delete" button
3. Expense removed immediately
4. Summary updates automatically

### 5. Viewing Summary
1. Use toggle buttons to switch views:
   - Total: Overall spending
   - By Category: Breakdown by category
   - By Date: Daily summaries
   - Monthly: Monthly totals

---

## Accessibility Features

- Keyboard navigation support
- Clear focus indicators
- Semantic HTML elements
- ARIA labels where needed
- Sufficient color contrast
- Responsive font sizes

---

## Animation & Transitions

- Smooth button hover effects
- Modal fade in/out
- Form field focus highlights
- Category button animations
- Subtle box shadows on interaction

---

## Error States

### Invalid Login
```
┌─────────────────────────────────┐
│ ⚠ Failed to log in. Check      │
│   your email and password       │
└─────────────────────────────────┘
```

### Validation Errors
```
┌─────────────────────────────────┐
│ ⚠ Please fill in all fields    │
└─────────────────────────────────┘
```

### No Expenses Yet
```
┌─────────────────────────────────┐
│  No expenses yet. Click on a    │
│  category to add your first     │
│  expense!                       │
└─────────────────────────────────┘
```

---

## Icons & Visual Elements

- **Close button**: × symbol
- **Add button**: + symbol  
- **Date picker**: 📅 calendar icon
- **Dropdown**: ▼ arrow
- **Card shadows**: Soft elevation
- **Gradients**: Background and buttons

---

This mockup guide provides a visual reference for the CeylonCash application UI and user experience.
