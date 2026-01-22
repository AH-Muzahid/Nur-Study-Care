# OAuth Quick Setup Guide

## ✅ Google OAuth (Already Configured)

### Step 1: Add Redirect URI
1. Go to: https://console.cloud.google.com/apis/credentials
2. Click your OAuth 2.0 Client ID
3. Under **Authorized redirect URIs**, add:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
4. Click **Save**

### Step 2: Test
```bash
npm run dev
```
Go to http://localhost:3000/login and click "Continue with Google"

---

## 🔧 Facebook OAuth Setup

### Step 1: Create Facebook App
1. Go to: https://developers.facebook.com/
2. Click **My Apps** → **Create App**
3. Choose **Consumer** as app type
4. Fill in:
   - App Name: **Nur Study Care**
   - Contact Email: Your email
5. Click **Create App**

### Step 2: Add Facebook Login
1. In your app dashboard, find **Facebook Login**
2. Click **Set Up**
3. Choose **Web** platform
4. Site URL: `http://localhost:3000`
5. Click **Save** and **Continue**

### Step 3: Configure OAuth Redirect URI
1. Left sidebar → **Facebook Login** → **Settings**
2. Under **Valid OAuth Redirect URIs**, add:
   ```
   http://localhost:3000/api/auth/callback/facebook
   ```
3. Click **Save Changes**

### Step 4: Get App Credentials
1. Left sidebar → **Settings** → **Basic**
2. Copy **App ID**
3. Click **Show** button next to **App Secret** and copy it

### Step 5: Update .env.local
Replace these lines in your `.env.local`:
```env
FACEBOOK_CLIENT_ID=paste-your-app-id-here
FACEBOOK_CLIENT_SECRET=paste-your-app-secret-here
```

### Step 6: Switch to Live Mode (Optional - for production)
1. Top right corner, toggle from **Development** to **Live**
2. This allows anyone to use Facebook login (not just test users)

### Step 7: Test
```bash
npm run dev
```
Go to http://localhost:3000/login and click "Continue with Facebook"

---

## 🚨 Common Issues

### Google: "redirect_uri_mismatch"
**Problem**: Redirect URI doesn't match what's configured in Google Cloud Console

**Solution**: Make sure it's exactly: `http://localhost:3000/api/auth/callback/google`

### Facebook: "Can't Load URL"
**Problem**: Facebook can't access your redirect URI or app is in Development mode

**Solutions**:
- Make sure redirect URI is added: `http://localhost:3000/api/auth/callback/facebook`
- Add yourself as a test user in **Roles** → **Test Users**
- Or switch app to **Live** mode (top right toggle)

### Facebook: "App Not Set Up: This app is still in development mode"
**Solution**: 
- Go to **Roles** → **Test Users** → Add yourself
- Or complete App Review to make it public
- Or toggle to **Live** mode (for testing only)

---

## 🎯 Production Setup

When deploying to production:

### Google:
1. Add production redirect URI:
   ```
   https://yourdomain.com/api/auth/callback/google
   ```
2. Publish OAuth consent screen (if external)

### Facebook:
1. Add production redirect URI:
   ```
   https://yourdomain.com/api/auth/callback/facebook
   ```
2. Switch app to **Live** mode
3. Complete App Review if needed for public access

---

## 📝 Notes

- **Google OAuth** credentials are already in your `.env.local`
- **Facebook OAuth** needs you to create an app first
- Both providers are already configured in `src/lib/auth.js`
- Test users can login even in Development mode
- For local testing, `http://localhost:3000` is fine
- For production, use `https://yourdomain.com`
