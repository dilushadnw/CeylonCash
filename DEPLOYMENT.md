# Deployment Guide - GitHub Pages

This guide will help you deploy your CeylonCash app to GitHub Pages.

## Prerequisites

✅ You have completed the Firebase setup (see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md))
✅ Your app works locally (`npm run dev`)
✅ You have a GitHub account
✅ You have Git installed

## Method 1: Automatic Deployment with gh-pages (Recommended)

### Step 1: Install gh-pages

```bash
npm install --save-dev gh-pages
```

### Step 2: Verify vite.config.js

Make sure your `vite.config.js` has the correct base path:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/CeylonCash/',  // Must match your repository name
  build: {
    outDir: 'dist',
  },
})
```

**Important:** The `base` value should be `'/YourRepositoryName/'`

### Step 3: Verify package.json Scripts

Check that these scripts exist in `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### Step 4: Build and Deploy

```bash
npm run deploy
```

This command will:
1. Build your app (`npm run build`)
2. Create a `gh-pages` branch
3. Push the built files to that branch

### Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section (in the left sidebar)
4. Under **Source**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Click **Save**

### Step 6: Wait for Deployment

- GitHub Pages takes a few minutes to deploy
- You'll see a message: "Your site is ready to be published at..."
- Wait for it to change to: "Your site is live at..."

### Step 7: Access Your App

Your app will be available at:
```
https://YOUR-USERNAME.github.io/CeylonCash/
```

For example: `https://dilushadnw.github.io/CeylonCash/`

## Method 2: Manual Deployment via GitHub Actions

### Step 1: Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main  # or master, depending on your default branch

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Step 2: Commit and Push

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions deployment workflow"
git push
```

### Step 3: Enable GitHub Pages

Follow Step 5 from Method 1 above.

## Updating Your Deployed App

Whenever you want to deploy updates:

```bash
# Make your changes
git add .
git commit -m "Your commit message"
git push origin main

# Deploy to GitHub Pages
npm run deploy
```

## Troubleshooting

### Issue: 404 Error on GitHub Pages

**Cause:** Base path in `vite.config.js` doesn't match repository name

**Solution:**
1. Check your repository name on GitHub
2. Update `vite.config.js`:
   ```javascript
   base: '/YourExactRepoName/',  // Must include slashes and match exactly
   ```
3. Rebuild and redeploy:
   ```bash
   npm run deploy
   ```

### Issue: App Shows Blank Page

**Causes:**
1. JavaScript errors (check browser console)
2. Firebase configuration issues
3. Incorrect base path

**Solutions:**

1. **Check browser console for errors:**
   - Press F12 to open Developer Tools
   - Look for red error messages

2. **Verify Firebase config:**
   - Ensure all Firebase credentials are correct in `src/config/firebase.js`

3. **Test locally first:**
   ```bash
   npm run build
   npm run preview
   ```

### Issue: Firebase Authentication Not Working

**Cause:** Firebase Auth domain not configured for your GitHub Pages URL

**Solution:**

1. Go to Firebase Console
2. Navigate to **Authentication** → **Settings** → **Authorized domains**
3. Add your GitHub Pages domain:
   ```
   your-username.github.io
   ```
4. Click **Add domain**

### Issue: CORS Errors

**Solution:**

1. In Firebase Console, go to **Authentication** → **Settings**
2. Add your GitHub Pages URL to authorized domains
3. For Firestore, check your security rules

### Issue: "Failed to load module" Errors

**Solution:**

1. Clear cache and rebuild:
   ```bash
   rm -rf dist node_modules package-lock.json
   npm install
   npm run build
   npm run deploy
   ```

## Environment Variables for Production

If you're using environment variables (recommended):

### Step 1: Use GitHub Secrets

1. Go to your repo **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add each Firebase config value:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - etc.

### Step 2: Update GitHub Actions Workflow

Modify `.github/workflows/deploy.yml`:

```yaml
- name: Build
  env:
    VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
    VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
    VITE_FIREBASE_PROJECT_ID: ${{ secrets.VITE_FIREBASE_PROJECT_ID }}
    VITE_FIREBASE_STORAGE_BUCKET: ${{ secrets.VITE_FIREBASE_STORAGE_BUCKET }}
    VITE_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.VITE_FIREBASE_MESSAGING_SENDER_ID }}
    VITE_FIREBASE_APP_ID: ${{ secrets.VITE_FIREBASE_APP_ID }}
  run: npm run build
```

## Custom Domain (Optional)

To use a custom domain with GitHub Pages:

### Step 1: Configure DNS

Add a CNAME record pointing to:
```
your-username.github.io
```

### Step 2: Add Custom Domain in GitHub

1. Go to repository **Settings** → **Pages**
2. Enter your custom domain
3. Check "Enforce HTTPS"

### Step 3: Create CNAME File

Create `public/CNAME` file with your domain:
```
yourdomain.com
```

## Performance Tips

### 1. Enable GZIP Compression
GitHub Pages automatically serves compressed files.

### 2. Optimize Build
The production build is already optimized by Vite:
- Minified JavaScript/CSS
- Code splitting
- Tree shaking

### 3. Use Firebase Hosting (Alternative)

For better performance, consider Firebase Hosting:

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## Monitoring and Analytics

### Google Analytics (Optional)

1. Add Google Analytics to Firebase (if enabled during setup)
2. Or add Google Analytics directly to `index.html`

### Firebase Analytics

Firebase automatically tracks:
- User engagement
- Page views
- Events

View in Firebase Console → **Analytics**

## Deployment Checklist

Before deploying to production:

- [ ] All features tested locally
- [ ] Firebase configuration is correct
- [ ] `vite.config.js` base path matches repo name
- [ ] Firebase security rules are enabled
- [ ] Authorized domains configured in Firebase
- [ ] No console errors in production build
- [ ] App works in `npm run preview`
- [ ] `.gitignore` excludes sensitive files
- [ ] README.md is updated
- [ ] All dependencies are up to date

## Quick Reference Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy to GitHub Pages
npm run deploy

# Force rebuild and deploy
rm -rf dist && npm run build && npm run deploy
```

## Getting Help

If you encounter issues:

1. Check browser console for errors (F12)
2. Review [GitHub Pages documentation](https://docs.github.com/pages)
3. Check [Vite deployment guide](https://vitejs.dev/guide/static-deploy.html)
4. Review Firebase Console for any errors

## Next Steps

✅ App is deployed!
✅ Users can access it online
✅ Data persists in Firebase

Consider adding:
- Budget limits and alerts
- Expense charts/graphs
- Export to CSV
- Receipt photo uploads
- Multi-currency support

## Resources

- [GitHub Pages Documentation](https://docs.github.com/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [gh-pages Package](https://www.npmjs.com/package/gh-pages)
- [Firebase Hosting Guide](https://firebase.google.com/docs/hosting)

---

🎉 **Congratulations!** Your budget tracking app is now live on GitHub Pages!
