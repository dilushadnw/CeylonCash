# Quick Start Guide

Get CeylonCash running in 5 minutes!

## Prerequisites

- Node.js (v14+)
- npm (v6+)
- A Google account (for Firebase)

## Step 1: Install Dependencies (1 minute)

```bash
npm install
```

## Step 2: Set Up Firebase (3 minutes)

### 2.1 Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Name it "CeylonCash" (or your preferred name)
4. Click through the setup wizard

### 2.2 Register Web App

1. In Firebase Console, click the Web icon (`</>`)
2. Register app with a nickname
3. Copy the configuration object shown

### 2.3 Enable Services

**Authentication:**
1. Click "Authentication" in sidebar
2. Click "Get started"
3. Enable "Email/Password"

**Firestore:**
1. Click "Firestore Database" in sidebar  
2. Click "Create database"
3. Start in "Production mode"
4. Choose a location

### 2.4 Add Security Rules

In Firestore > Rules tab, paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /categories/{categoryId} {
      allow read, write: if request.auth != null && 
                            request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
                       request.auth.uid == request.resource.data.userId;
    }
    
    match /expenses/{expenseId} {
      allow read, write: if request.auth != null && 
                            request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
                       request.auth.uid == request.resource.data.userId;
    }
  }
}
```

Click "Publish"

## Step 3: Configure Your App (1 minute)

Open `src/config/firebase.js` and replace the placeholders:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",              // From Firebase Console
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

## Step 4: Run the App!

```bash
npm run dev
```

Open [http://localhost:5173/CeylonCash/](http://localhost:5173/CeylonCash/)

## Step 5: Try It Out

1. **Sign Up**: Create an account with email/password
2. **Add Categories**: Click "+ Add Category" and create some (Food, Bus, Rent, etc.)
3. **Add Expenses**: Click a category button and fill in the expense details
4. **View Summaries**: Toggle between Total, By Category, By Date, and Monthly views
5. **Edit/Delete**: Try editing or deleting an expense

## Deployment (Optional)

To deploy to GitHub Pages:

```bash
npm run deploy
```

Then enable GitHub Pages in your repository settings:
- Settings → Pages → Source: `gh-pages` branch

Your app will be live at:
```
https://YOUR-USERNAME.github.io/CeylonCash/
```

## Common Issues

### "Firebase: Error (auth/invalid-api-key)"
- Double-check your Firebase config values
- Make sure you copied them correctly from Firebase Console

### "Missing or insufficient permissions"
- Verify you published the security rules in Firestore
- Make sure you're logged in

### Build errors
```bash
rm -rf node_modules dist
npm install
npm run build
```

## Need More Help?

- **Detailed Firebase Setup**: See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
- **Deployment Guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Code Documentation**: See [CODE_DOCUMENTATION.md](./CODE_DOCUMENTATION.md)
- **Main README**: See [README.md](./README.md)

## That's It! 🎉

You now have a fully functional budget tracking app running locally!

Next steps:
- Add your expenses
- Customize the categories
- Deploy to GitHub Pages
- Share with friends and family
