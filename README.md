# CeylonCash - Budget Tracking Web App

A simple and intuitive budget tracking web application built with React and Firebase. Track your expenses by categories, view summaries, and manage your personal finances with ease.

## Features

✨ **User Authentication**
- Sign up with email and password
- Secure login/logout functionality
- User-specific data isolation

📊 **Expense Management**
- Create custom expense categories
- Add expenses with amount, date, and description
- Edit and delete expenses
- Quick expense entry via category buttons

📈 **Dashboard & Analytics**
- Total expenses overview
- Expenses grouped by category with percentages
- Daily expense summaries
- Monthly expense tracking
- Visual summaries with multiple view modes

📱 **Mobile-Friendly Design**
- Responsive layout for all devices
- Clean and modern UI
- Smooth interactions

## Tech Stack

- **Frontend:** React 19
- **Build Tool:** Vite
- **Backend:** Firebase (Authentication + Firestore)
- **Hosting:** GitHub Pages

## Prerequisites

Before you begin, ensure you have:
- Node.js (v14 or higher)
- npm (v6 or higher)
- A Google/Firebase account
- A GitHub account

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/dilushadnw/CeylonCash.git
cd CeylonCash
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Setup

Follow the detailed instructions in [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) to:
- Create a Firebase project
- Enable Authentication
- Set up Firestore database
- Get your Firebase configuration

### 4. Configure Firebase

Update the Firebase configuration in `src/config/firebase.js` with your project credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 5. Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deployment to GitHub Pages

See [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step deployment instructions.

## Project Structure

```
CeylonCash/
├── src/
│   ├── components/          # React components
│   │   ├── Login.jsx       # Login form
│   │   ├── Signup.jsx      # Signup form
│   │   ├── Dashboard.jsx   # Main dashboard
│   │   ├── CategoryManager.jsx  # Category management
│   │   ├── AddExpense.jsx  # Add expense modal
│   │   ├── ExpenseList.jsx # List of expenses
│   │   ├── Summary.jsx     # Expense summaries
│   │   └── *.css          # Component styles
│   ├── contexts/
│   │   └── AuthContext.jsx # Authentication context
│   ├── config/
│   │   └── firebase.js     # Firebase configuration
│   ├── App.jsx             # Main app component
│   ├── App.css             # Global styles
│   └── main.jsx            # App entry point
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies
└── README.md               # This file
```

## Usage Guide

### Creating Your First Category

1. After logging in, you'll see the "Expense Categories" section
2. Click the "+ Add Category" button
3. Enter a category name (e.g., "Food", "Transport", "Rent")
4. Click "Add" to save

### Adding an Expense

1. Click on any category button
2. Fill in the expense details:
   - **Amount:** Enter the expense amount
   - **Category:** Pre-selected or choose another
   - **Date:** Default is today, but you can select past dates
   - **Description:** Optional note about the expense
3. Click "Add Expense" to save

### Viewing Summaries

Use the view toggle buttons in the Summary section:
- **Total:** See overall expenses and transaction count
- **By Category:** View breakdown by category with percentages
- **By Date:** See daily expense summaries
- **Monthly:** Track monthly spending

### Editing/Deleting Expenses

1. Find the expense in the "Recent Expenses" list
2. Click "Edit" to modify details or "Delete" to remove

## Security Notes

⚠️ **Important Security Considerations:**

1. **Never commit Firebase credentials to Git**
   - The `.gitignore` file excludes sensitive files
   - Always use environment variables for production

2. **Configure Firebase Security Rules**
   - See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for security rules
   - These rules ensure users can only access their own data

3. **Enable Firebase App Check** (Optional but recommended)
   - Protects your Firebase resources from abuse

## Troubleshooting

### Build Errors

If you encounter build errors:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Firebase Connection Issues

1. Verify your Firebase config in `src/config/firebase.js`
2. Check Firebase Console for any service issues
3. Ensure Firestore and Authentication are enabled

### GitHub Pages 404 Errors

1. Check that `base` in `vite.config.js` matches your repo name
2. Ensure GitHub Pages is enabled in repository settings
3. Wait a few minutes for deployment to complete

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [ISC License](LICENSE).

## Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation

## Acknowledgments

- Built with React and Vite
- Powered by Firebase
- Deployed on GitHub Pages

---

Made with ❤️ for better personal finance management
