# Firebase Setup Guide for CeylonCash

This guide will walk you through setting up Firebase for the CeylonCash budget tracking app.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter a project name (e.g., "CeylonCash")
4. (Optional) Enable Google Analytics if you want usage tracking
5. Click "Create project" and wait for it to be created
6. Click "Continue" when done

## Step 2: Register Your Web App

1. In the Firebase Console, click the **Web icon** (`</>`) to add a web app
2. Enter an app nickname (e.g., "CeylonCash Web App")
3. **Check** the "Also set up Firebase Hosting" box (optional)
4. Click "Register app"
5. You'll see your Firebase configuration object - **save this information**

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

6. Click "Continue to console"

## Step 3: Enable Firebase Authentication

1. In the Firebase Console, click **"Authentication"** in the left sidebar
2. Click **"Get started"** button
3. Go to the **"Sign-in method"** tab
4. Enable **"Email/Password"** provider:
   - Click on "Email/Password"
   - Toggle the first switch to **Enable**
   - Click "Save"

## Step 4: Set Up Firestore Database

1. In the Firebase Console, click **"Firestore Database"** in the left sidebar
2. Click **"Create database"** button
3. Choose a location for your database (select closest to your users)
4. Start in **"Production mode"** for now (we'll add security rules next)
5. Click "Enable"

## Step 5: Configure Firestore Security Rules

1. In Firestore Database, go to the **"Rules"** tab
2. Replace the default rules with the following:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Categories collection
    match /categories/{categoryId} {
      // Users can only read/write their own categories
      allow read, write: if request.auth != null && 
                            request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
                       request.auth.uid == request.resource.data.userId;
    }
    
    // Expenses collection
    match /expenses/{expenseId} {
      // Users can only read/write their own expenses
      allow read, write: if request.auth != null && 
                            request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
                       request.auth.uid == request.resource.data.userId;
    }
  }
}
```

3. Click **"Publish"** to save the rules

**What these rules do:**
- Users must be authenticated to access data
- Users can only see and modify their own categories and expenses
- The `userId` field must match the authenticated user's ID

## Step 6: Update Your App Configuration

1. Open `src/config/firebase.js` in your code editor
2. Replace the placeholder values with your Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "YOUR_ACTUAL_AUTH_DOMAIN",
  projectId: "YOUR_ACTUAL_PROJECT_ID",
  storageBucket: "YOUR_ACTUAL_STORAGE_BUCKET",
  messagingSenderId: "YOUR_ACTUAL_MESSAGING_SENDER_ID",
  appId: "YOUR_ACTUAL_APP_ID"
};
```

3. Save the file

## Step 7: Test Your Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your browser to `http://localhost:5173`

3. Try signing up with a test email and password

4. Check Firebase Console:
   - Go to **Authentication** → **Users** to see your registered user
   - Try adding a category and expense
   - Go to **Firestore Database** → **Data** to see your stored data

## Step 8: (Optional) Create Firestore Indexes

If you get errors about missing indexes when querying:

1. Click the error link in your browser console (it will take you to Firebase Console)
2. Or manually create indexes in **Firestore Database** → **Indexes**
3. Add composite indexes if needed for complex queries

## Step 9: (Optional) Set Up Firebase App Check

For additional security against abuse:

1. Go to **App Check** in Firebase Console
2. Click "Get started"
3. Register your app with reCAPTCHA v3
4. Follow the setup instructions

## Common Issues and Solutions

### Issue: "Firebase: Error (auth/popup-blocked)"
**Solution:** Ensure popups are allowed in your browser settings

### Issue: "Missing or insufficient permissions"
**Solution:** 
- Check that your Firestore security rules are published
- Verify the user is authenticated
- Ensure `userId` is being set correctly in your documents

### Issue: "Firebase: Firebase App named '[DEFAULT]' already exists"
**Solution:** 
- You're initializing Firebase twice
- Check that you're only importing from `src/config/firebase.js`

### Issue: Configuration not found
**Solution:**
- Double-check that you copied all values from Firebase Console
- Ensure there are no typos in your configuration
- Verify the file path to `firebase.js` is correct

## Security Best Practices

1. **Never commit Firebase config with real values to public repositories**
   - Use environment variables for production
   - Add `.env` files to `.gitignore`

2. **Keep security rules strict**
   - Always validate `userId` matches `auth.uid`
   - Test rules using the Firebase Console simulator

3. **Monitor usage**
   - Check Firebase Console regularly for unusual activity
   - Set up billing alerts in Google Cloud Console

4. **Enable App Check** for production apps
   - Protects against abuse and unauthorized access

## Environment Variables (Production)

For production deployment, use environment variables:

1. Create a `.env.local` file (already in `.gitignore`):
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

2. Update `src/config/firebase.js`:
```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

## Next Steps

✅ Firebase is now configured!
✅ Your app can authenticate users
✅ Data is being stored securely in Firestore

Next: See [DEPLOYMENT.md](./DEPLOYMENT.md) to deploy your app to GitHub Pages.

## Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication Guide](https://firebase.google.com/docs/auth)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
