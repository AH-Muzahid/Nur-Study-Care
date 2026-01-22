# OAuth Setup & Troubleshooting Guide

## Google OAuth Setup

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Google+ API**

### 2. Create OAuth 2.0 Credentials

1. **APIs & Services** → **Credentials**
2. Click **+ CREATE CREDENTIALS** → **OAuth client ID**
3. Application type: **Web application**
4. Name: `Nur Study Care`

### 3. Configure Authorized Redirect URIs

**For Development:**
```
http://localhost:3000/api/auth/google/callback
```

**For Production:**
```
https://yourdomain.com/api/auth/google/callback
```

⚠️ **Important:**
- No trailing slashes
- Must match exactly with `.env.local`
- HTTPS required for production
- Can add multiple URIs (dev + prod)

### 4. Add to .env.local

```env
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback
```

---

## Facebook OAuth Setup

### 1. Create Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. **My Apps** → **Create App**
3. Select **Consumer** → **Next**
4. App Name: `Nur Study Care`
5. Contact Email: Your email

### 2. Add Facebook Login Product

1. In app dashboard, click **Add Product**
2. Find **Facebook Login** → **Set Up**
3. Select **Web** platform

### 3. Configure OAuth Settings

1. **Facebook Login** → **Settings**
2. **Valid OAuth Redirect URIs:**

**For Development:**
```
http://localhost:3000/api/auth/facebook/callback
```

**For Production:**
```
https://yourdomain.com/api/auth/facebook/callback
```

3. **Save Changes**

### 4. Get App Credentials

1. **Settings** → **Basic**
2. Copy **App ID** and **App Secret**

### 5. Add to .env.local

```env
FACEBOOK_CLIENT_ID=your-facebook-app-id
FACEBOOK_CLIENT_SECRET=your-facebook-app-secret
FACEBOOK_REDIRECT_URI=http://localhost:3000/api/auth/facebook/callback
```

---

## Common OAuth Errors & Solutions

### ❌ Error 400: redirect_uri_mismatch (Google)

**Cause:** Redirect URI doesn't match Google Console settings

**Solution:**
1. Check `.env.local` - make sure `GOOGLE_REDIRECT_URI` is exact
2. Go to Google Cloud Console → Credentials
3. Edit OAuth 2.0 Client ID
4. Add exact URI: `http://localhost:3000/api/auth/google/callback`
5. **No trailing slash!**
6. Save and wait 5 minutes for changes to propagate

### ❌ Can't load URL: The domain is not included in the app's domains (Facebook)

**Cause:** Localhost not whitelisted in Facebook app

**Solution:**
1. Facebook Developers → Your App
2. **Settings** → **Basic**
3. **App Domains:** Add `localhost`
4. **Website Site URL:** Add `http://localhost:3000`
5. Save Changes

### ❌ App Not Setup: This app is still in development mode (Facebook)

**Cause:** Facebook app is in development mode

**Solution:**
- For testing: Add your Facebook account as a test user
  1. **Roles** → **Test Users** → **Add**
- For production: Submit app for review

### ❌ Access Denied: Missing Required Permissions

**Cause:** User didn't grant required permissions

**Solution:**
- Check scope configuration in `social-auth-service.js`
- For Google: `userinfo.profile` and `userinfo.email`
- For Facebook: `email` and `public_profile`

### ❌ Invalid Client ID

**Cause:** Wrong credentials in `.env.local`

**Solution:**
1. Double-check Client ID and Secret from provider console
2. No extra spaces or quotes in `.env.local`
3. Restart dev server after changing env variables

---

## Testing OAuth Flow

### Manual Testing

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Test Google OAuth:**
   - Navigate to: `http://localhost:3000/login`
   - Click "Sign in with Google"
   - Should redirect to Google login
   - After login, should redirect back to dashboard

3. **Test Facebook OAuth:**
   - Navigate to: `http://localhost:3000/login`
   - Click "Sign in with Facebook"
   - Should redirect to Facebook login
   - After login, should redirect back to dashboard

### Check Logs

Monitor terminal for:
- `Redirecting to Google OAuth` - OAuth initiated
- `User logged in via Google OAuth` - Success
- Any error messages with stack traces

---

## Production Checklist

Before deploying to production:

### Google OAuth
- [ ] Add production redirect URI to Google Console
- [ ] Update `GOOGLE_REDIRECT_URI` in production env
- [ ] Verify domain ownership if required
- [ ] Enable appropriate APIs

### Facebook OAuth
- [ ] Add production redirect URI to Facebook app
- [ ] Submit app for review (if needed)
- [ ] Verify domain ownership
- [ ] Add privacy policy URL
- [ ] Add terms of service URL

### Environment Variables
- [ ] Update `NEXT_PUBLIC_APP_URL` to production domain
- [ ] Use HTTPS URLs for all redirect URIs
- [ ] Rotate JWT secrets (don't use dev secrets)
- [ ] Enable proper CORS settings

### Security
- [ ] Enable HTTPS (required for OAuth)
- [ ] Set secure cookie flags
- [ ] Implement rate limiting
- [ ] Add CSRF protection
- [ ] Monitor OAuth logs

---

## Quick Reference

### Current Configuration

**Development:**
- App URL: `http://localhost:3000`
- Google Redirect: `http://localhost:3000/api/auth/google/callback`
- Facebook Redirect: `http://localhost:3000/api/auth/facebook/callback`

**API Endpoints:**
- Register: `POST /api/auth/register`
- Login: `POST /api/auth/login`
- Logout: `POST /api/auth/logout`
- Refresh: `POST /api/auth/refresh`
- Google: `GET /api/auth/google`
- Google Callback: `GET /api/auth/google/callback`
- Facebook: `GET /api/auth/facebook`
- Facebook Callback: `GET /api/auth/facebook/callback`

### Test Script

Run automated API tests:
```bash
node scripts/test-auth-api.js
```

---

## Support Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Facebook Login Documentation](https://developers.facebook.com/docs/facebook-login)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
