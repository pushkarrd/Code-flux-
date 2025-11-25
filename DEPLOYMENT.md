# 🚀 Deployment Guide - CodeFlux

## Overview

CodeFlux is a full-stack application with:
- **Frontend**: React + Vite (Vercel)
- **Backend**: Node.js + Express (Vercel)
- **Database**: Firebase (Cloud)

This guide covers deploying to **Vercel** (recommended).

---

## Prerequisites

1. **GitHub Account** - Already have (pushkarrd)
2. **Vercel Account** - Create at https://vercel.com
3. **Firebase Project** - Already configured
4. **API Keys** - Already secured in environment variables

---

## Deployment Architecture

```
┌─────────────────────────────────────────────┐
│         Frontend (Vercel)                   │
│  - React + Vite                             │
│  - URL: codeflux.vercel.app                 │
│  - Redirects /api/* to backend              │
└─────────────────────────────────────────────┘
                    ↓
           ┌────────────────┐
           │   Firebase     │
           │  (Auth, DB)    │
           └────────────────┘
                    ↑
┌─────────────────────────────────────────────┐
│         Backend (Vercel Serverless)         │
│  - Node.js + Express                        │
│  - URL: codeflux-backend.vercel.app         │
│  - API endpoints                            │
└─────────────────────────────────────────────┘
```

---

## Step 1: Setup Vercel CLI

### Install Vercel CLI
```bash
npm install -g vercel
```

### Login to Vercel
```bash
vercel login
```

Follow the prompts to authenticate with your GitHub account.

---

## Step 2: Deploy Backend First

### Navigate to server directory
```bash
cd 'c:\Users\Pushkar\codeflux clone\Code-flux-\server'
```

### Deploy to Vercel
```bash
vercel deploy --prod
```

**During deployment:**
1. Select "GitHub" as source
2. Link to `pushkarrd/Code-flux-` repository
3. Set project name: `codeflux-backend`
4. Framework preset: **Other** (Node.js)
5. Build command: `npm install`
6. Output directory: `.`
7. Root directory: `server`

### Add Environment Variables in Vercel Dashboard

Go to **Project Settings → Environment Variables** and add:

```
VITE_GEMINI_API_KEY = [Get from Google AI Studio]
VITE_YOUTUBE_API_KEY = [Get from YouTube Data API Console]
VITE_YOUTUBE_API_KEY_FALLBACK = [Get from YouTube Data API Console]
VITE_QUIZ_GEMINI_API_KEY = [Get from Google AI Studio]
GOOGLE_CLIENT_ID = [Your Google OAuth Client ID]
GOOGLE_CLIENT_SECRET = [Your Google OAuth Client Secret]
GOOGLE_CALLBACK_URL = https://codeflux-backend.vercel.app/api/auth/google/callback
NODE_ENV = production
```

**Note backend URL:** `https://codeflux-backend.vercel.app` (you'll need this for frontend)

---

## Step 3: Deploy Frontend

### Navigate to root directory
```bash
cd 'c:\Users\Pushkar\codeflux clone\Code-flux-'
```

### Deploy to Vercel
```bash
vercel deploy --prod
```

**During deployment:**
1. Link to same GitHub repo
2. Set project name: `codeflux`
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`

### Add Environment Variables in Vercel Dashboard

Go to **Project Settings → Environment Variables** and add:

```
VITE_API_URL = https://codeflux-backend.vercel.app/api
VITE_FIREBASE_API_KEY = AIzaSyDijo4LWfILX2FdmhAOe0dSvePMBbnMus8
VITE_FIREBASE_AUTH_DOMAIN = ai-learning-platform-4770d.firebaseapp.com
VITE_FIREBASE_PROJECT_ID = ai-learning-platform-4770d
VITE_FIREBASE_STORAGE_BUCKET = ai-learning-platform-4770d.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID = 475093849889
VITE_FIREBASE_APP_ID = 1:475093849889:web:8b3f8c9d4e5f6a7b8c9d0e1f
VITE_GEMINI_API_KEY = AIzaSyAmkyo_IDM0i0yev0r0iTfRI6sZfTE-cro
VITE_YOUTUBE_API_KEY = AIzaSyBzgoVtLKh3ynOnH0o63ZMu5PMlkkfZSbI
VITE_YOUTUBE_API_KEY_FALLBACK = AIzaSyBzgoVtLKh3ynOnH0o63ZMu5PMlkkfZSbI
VITE_QUIZ_GEMINI_API_KEY = AIzaSyAmkyo_IDM0i0yev0r0iTfRI6sZfTE-cro
```

---

## Step 4: Configure Google OAuth

### Update Firebase Redirect URLs

Go to **Firebase Console → Authentication → Sign-in method → Google**

Add these authorized redirect URIs:
```
https://codeflux.vercel.app
https://codeflux.vercel.app/auth
https://codeflux-backend.vercel.app/api/auth/google/callback
```

### Get Google OAuth Credentials

If you don't have them:
1. Go to **Google Cloud Console**
2. Create OAuth 2.0 Client ID (Web)
3. Add authorized redirect URIs:
   - `https://codeflux-backend.vercel.app/api/auth/google/callback`
   - `https://codeflux.vercel.app`

4. Copy Client ID and Secret
5. Add to Vercel environment variables (Step 3)

---

## Step 5: CORS Configuration

The backend already has CORS configured. Verify in `server/index.js`:

```javascript
const corsOptions = {
  origin: [
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:5176',
    'https://codeflux.vercel.app'
  ],
  credentials: true
}
```

Update to include your production domain if different.

---

## Step 6: Verify Deployment

### Frontend
1. Visit: `https://codeflux.vercel.app`
2. Check if app loads
3. Test authentication
4. Create a course (should hit backend)

### Backend
1. Visit: `https://codeflux-backend.vercel.app/api/health`
2. Should return: `{"status":"ok"}`

### Test Integration
1. Sign in with Google
2. Create course
3. View chapters
4. Check YouTube videos load

---

## Environment Variables Summary

### Frontend (`.env.local`)
```
VITE_API_URL=https://codeflux-backend.vercel.app/api
VITE_FIREBASE_*=***
VITE_GEMINI_API_KEY=***
VITE_YOUTUBE_API_KEY=***
```

### Backend (`server/.env`)
```
NODE_ENV=production
VITE_GEMINI_API_KEY=***
VITE_YOUTUBE_API_KEY=***
GOOGLE_CLIENT_ID=***
GOOGLE_CLIENT_SECRET=***
GOOGLE_CALLBACK_URL=https://codeflux-backend.vercel.app/api/auth/google/callback
```

### Firebase (Cloud)
- Project ID: `ai-learning-platform-4770d`
- No environment variables needed (uses client-side config)

---

## Troubleshooting

### "API connection refused"
```
✓ Verify backend URL in frontend .env
✓ Check backend environment variables set in Vercel
✓ Ensure CORS allows frontend domain
```

### "Firebase offline error"
```
✓ Check Firebase config in frontend .env
✓ Verify web app registered in Firebase Console
✓ Check Firebase project quotas
```

### "YouTube videos not found"
```
✓ Verify YouTube API key in backend .env
✓ Check API quota in Google Cloud Console
✓ Ensure API is enabled
```

### "Google OAuth not working"
```
✓ Check callback URL matches backend deployment URL
✓ Verify OAuth credentials in Google Cloud Console
✓ Ensure redirect URIs include Vercel domains
✓ Check CORS configuration in backend
```

### "Deployment failed"
```
✓ Check build command in vercel.json
✓ Verify all environment variables set
✓ Check Node.js version (need 18+)
✓ Review deployment logs in Vercel Dashboard
```

---

## Continuous Deployment

### Auto-Deploy on Push
1. Go to Vercel Dashboard
2. Project Settings → Git
3. Enable auto-deploy on push
4. Choose branch: `main` or `codeflux`

Now every push to GitHub will auto-deploy!

---

## Monitoring

### Vercel Analytics
- Frontend: Dashboard → Analytics
- Monitor page load time, Core Web Vitals

### Backend Monitoring
- Logs: Dashboard → Deployment → Logs
- Monitor for errors, check endpoint usage

### Firebase Monitoring
- Console → Monitoring
- Check Firestore usage, Auth quotas

---

## Rollback

If deployment breaks:

1. **Revert code**:
   ```bash
   git revert HEAD
   git push origin main
   ```

2. **Vercel will auto-deploy** the previous version

3. **Or manually rollback**:
   - Vercel Dashboard → Deployments
   - Select previous deployment
   - Click "Promote to Production"

---

## Post-Deployment Checklist

- [ ] Frontend loads at `https://codeflux.vercel.app`
- [ ] Backend responds at `https://codeflux-backend.vercel.app/api/health`
- [ ] Google OAuth works
- [ ] Can create courses
- [ ] Videos display
- [ ] Progress saves to Firebase
- [ ] Quiz generates with Gemini
- [ ] YouTube videos found
- [ ] Mobile responsive works
- [ ] Performance acceptable

---

## Custom Domain (Optional)

### Add Custom Domain
1. Vercel Dashboard → Settings → Domains
2. Add your domain (e.g., `codeflux.com`)
3. Update DNS records per Vercel instructions
4. SSL certificate auto-generates

---

## Performance Optimization (Optional)

### Image Optimization
```bash
npm install -D @vercel/image-optimization
```

### Edge Functions (Advanced)
```bash
vercel env add API_URL
```

### Caching
Vercel automatically caches static assets for 1 year.

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Firebase Docs**: https://firebase.google.com/docs
- **GitHub**: https://github.com/pushkarrd/Code-flux-

---

**Deployment complete!** 🎉

Your app is now live at:
- 🌐 Frontend: https://codeflux.vercel.app
- 🔧 Backend: https://codeflux-backend.vercel.app
- 📱 Mobile: Responsive and ready
