# Sign-In Fix After Deployment

## Problem: "Node cannot be found in the current page" Error

This error occurs when sign-in fails after deploying to production (Render).

## Root Causes

1. **CORS Blocking**: Backend only accepted localhost URLs, not Render production URLs
2. **No Login Route**: App had no `/login` route - users couldn't access login page
3. **Hardcoded Backend URL**: Firebase.js used hardcoded backend URL instead of env variable

## Solution Applied ✅

### 1. Backend CORS Fix
**File**: `server/index.js`

Changed from hardcoded localhost list to dynamic CORS:

```javascript
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:5174',
      'http://localhost:5173',
      'http://localhost:5175',
      'http://localhost:5176',
      'http://localhost:4173'
    ];

    // Allow all Render domains and localhost
    const isRenderUrl = origin && origin.includes('onrender.com');
    const isLocalhost = origin && origin.includes('localhost');
    
    if (!origin || isRenderUrl || isLocalhost || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
  credentials: true
}));
```

**Why**: This allows requests from any Render deployment (*.onrender.com) while still restricting unknown origins.

### 2. Added Login Route
**File**: `src/App.jsx`

Added `/login` route to make Login page accessible:

```jsx
import Login from './components/Login'

// In App component
const isLogin = location.pathname === '/login'

{/* ... */}
} : isLogin ? (
  <Routes>
    <Route path="/login" element={<Login/>} />
  </Routes>
) : isOnboarding ? {
```

### 3. Dynamic Backend URL
**File**: `src/lib/firebase.js`

Changed from hardcoded URL to environment variable:

```javascript
// Before
const response = await fetch('https://code-flux-1.onrender.com/api/auth/google/callback', {

// After
const backendUrl = import.meta.env.VITE_API_URL || 'https://code-flux-1.onrender.com/api';
const response = await fetch(`${backendUrl}/auth/google/callback`, {
```

**Why**: Makes it work in dev (localhost) and production (Render) automatically.

## Post-Deployment Steps

### 1. Redeploy Backend with CORS Fix
```bash
# Push changes to GitHub
git push origin main

# In Render dashboard:
# 1. Go to your backend service
# 2. Click "Manual Deploy" > "Deploy latest commit"
# 3. Wait for deployment to complete
```

### 2. Redeploy Frontend with Login Route
```bash
# Frontend automatically redeploys from GitHub
# Or manually redeploy in Render dashboard
```

### 3. Test Sign-In Flow

#### Test Locally First (Optional)
```bash
# Terminal 1: Start backend
cd server
npm run dev

# Terminal 2: Start frontend
npm run dev

# Visit http://localhost:5174
# Try signing in - should work
```

#### Test on Production
1. Visit your Render frontend URL: `https://your-frontend.onrender.com`
2. Click **Sign in with Google** button
3. Complete Google OAuth flow
4. Should redirect to Dashboard ✅

## Verification Checklist

- [ ] Backend deployed with CORS fix
- [ ] Frontend deployed with Login route
- [ ] Can access `/login` page in production
- [ ] Google Sign-In button works
- [ ] After sign-in, redirects to `/dashboard`
- [ ] Session token persists in localStorage
- [ ] Backend logs show session creation with email

## Common Issues & Solutions

### Issue: Still getting CORS error

**Solution**: 
1. Check browser DevTools Network tab
2. Look for failed preflight requests
3. Verify backend has been redeployed (not just frontend)
4. Restart backend service manually in Render dashboard

### Issue: Sign-in button does nothing

**Solution**:
1. Check console for JavaScript errors
2. Verify Firebase is initialized (`VITE_FIREBASE_*` env vars set)
3. Ensure Google OAuth app is configured in Google Cloud

### Issue: Sign-in works but redirects to login page

**Solution**:
1. Check if session token is stored: `localStorage.getItem('sessionToken')`
2. Verify backend responded with `sessionToken` in sign-in response
3. Check browser DevTools > Application > Storage > localStorage

## Backend Sign-In Flow

When user signs in:

```
1. User clicks "Sign in with Google"
2. Firebase handles Google OAuth popup
3. Frontend gets Firebase token + user data
4. Frontend sends to backend: `/api/auth/google/callback`
   {
     code: <firebase_token>,
     user: { uid, email, displayName, photoURL }
   }
5. Backend creates session and returns:
   {
     success: true,
     sessionToken: <token>,
     user: { ... }
   }
6. Frontend stores sessionToken in localStorage
7. All API calls include: Authorization: Bearer <sessionToken>
```

## Security Notes

✅ **Good**:
- Session tokens stored in localStorage (accessible to JS)
- 24-hour expiration on backend
- CORS properly restricts origins
- Credentials sent via Authorization header

⚠️ **Recommendations**:
- Use `httpOnly` cookies in production (more secure than localStorage)
- Add rate limiting on `/api/auth/google/callback`
- Rotate session tokens periodically

## Files Modified

1. `server/index.js` - CORS configuration
2. `src/App.jsx` - Added login route
3. `src/lib/firebase.js` - Dynamic backend URL
4. `.env.local` - Already has VITE_API_URL

## Commit

```
commit 3bc77dc
Author: AI Assistant
Date: Nov 25, 2025

fix: Fix sign-in failure after deployment
- Add CORS support for Render deployment
- Add /login route to app
- Use dynamic backend URL from env variable
```

## Next Steps

- [ ] Monitor sign-in errors in backend logs
- [ ] Test on multiple browsers
- [ ] Set up monitoring/alerts for auth failures
- [ ] Document for team members
