# ⚡ Quick Deployment Checklist

## 5-Minute Deployment Setup

### ✅ Prerequisites
- [ ] Vercel account created (free at vercel.com)
- [ ] Connected to GitHub (pushkarrd)
- [ ] API keys ready:
  - Gemini API Key ✓
  - YouTube API Key ✓
  - Firebase Config ✓
  - Google OAuth ID & Secret

### 🚀 Step 1: Install Vercel CLI (2 min)
```powershell
npm install -g vercel
vercel login
```

### 🚀 Step 2: Deploy Backend (2 min)
```powershell
cd 'c:\Users\Pushkar\codeflux clone\Code-flux-\server'
vercel deploy --prod
```

**During prompt:**
- Project: `codeflux-backend`
- Framework: `Other` (Node.js)
- Build: `npm install`

**After deploy:**
- Copy the backend URL (e.g., `https://codeflux-backend.vercel.app`)
- Add to Vercel env vars (see DEPLOYMENT.md)

### 🚀 Step 3: Deploy Frontend (2 min)
```powershell
cd 'c:\Users\Pushkar\codeflux clone\Code-flux-'
vercel deploy --prod
```

**During prompt:**
- Project: `codeflux`
- Framework: `Vite`
- Build: `npm run build`
- Output: `dist`

### 🚀 Step 4: Add Environment Variables (3 min)

**Vercel Dashboard → Settings → Environment Variables**

**Frontend (codeflux project):**
```
VITE_API_URL=https://codeflux-backend.vercel.app/api
VITE_FIREBASE_API_KEY=AIzaSyDijo4LWfILX2FdmhAOe0dSvePMBbnMus8
VITE_FIREBASE_AUTH_DOMAIN=ai-learning-platform-4770d.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=ai-learning-platform-4770d
VITE_FIREBASE_STORAGE_BUCKET=ai-learning-platform-4770d.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=475093849889
VITE_FIREBASE_APP_ID=1:475093849889:web:8b3f8c9d4e5f6a7b8c9d0e1f
VITE_GEMINI_API_KEY=[Get from Google AI Studio]
VITE_YOUTUBE_API_KEY=AIzaSyBzgoVtLKh3ynOnH0o63ZMu5PMlkkfZSbI
VITE_YOUTUBE_API_KEY_FALLBACK=AIzaSyBzgoVtLKh3ynOnH0o63ZMu5PMlkkfZSbI
VITE_QUIZ_GEMINI_API_KEY=[Get from Google AI Studio]
```

**Backend (codeflux-backend project):**
```
VITE_GEMINI_API_KEY=[Get from Google AI Studio]
VITE_YOUTUBE_API_KEY=AIzaSyBzgoVtLKh3ynOnH0o63ZMu5PMlkkfZSbI
VITE_YOUTUBE_API_KEY_FALLBACK=AIzaSyBzgoVtLKh3ynOnH0o63ZMu5PMlkkfZSbI
VITE_QUIZ_GEMINI_API_KEY=[Get from Google AI Studio]
GOOGLE_CLIENT_ID=[Your OAuth Client ID]
GOOGLE_CLIENT_SECRET=[Your OAuth Client Secret]
GOOGLE_CALLBACK_URL=https://codeflux-backend.vercel.app/api/auth/google/callback
NODE_ENV=production
```

### ✅ Step 5: Verify Deployment

**Test Frontend:**
```
https://codeflux.vercel.app
```
(Should load app, not error)

**Test Backend:**
```
https://codeflux-backend.vercel.app/api/health
```
(Should return `{"status":"ok"}`)

**Test Integration:**
- Sign in with Google
- Create course
- Check videos load
- Test quiz

### 🎉 Done!

Your app is live:
- 🌐 https://codeflux.vercel.app
- 🔧 https://codeflux-backend.vercel.app

---

## Common Issues

| Issue | Solution |
|-------|----------|
| API 404 | Check VITE_API_URL in frontend env |
| Google OAuth fails | Update callback URL in Google Cloud Console |
| YouTube videos 404 | Verify YouTube API key in backend env |
| Firebase offline | Check Firebase config in frontend env |
| Deployment timeout | Increase timeout in vercel.json |

---

## Enable Auto-Deploy

1. Vercel Dashboard → Settings → Git
2. Enable auto-deploy on push
3. Every push to `main` → auto-deploys!

---

For full details, see: `DEPLOYMENT.md`
