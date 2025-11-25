# ✅ Post-Deployment Configuration Guide

## After You Deploy Frontend & Backend

Once both are deployed on Vercel, follow these exact steps:

---

## Step 1: Get Your Deployment URLs (2 min)

### From Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Find your two projects:
   - `codeflux` (frontend)
   - `codeflux-backend` (backend)

3. Copy the URLs:
   - **Frontend URL**: `https://codeflux.vercel.app` (or your custom domain)
   - **Backend URL**: `https://codeflux-backend.vercel.app`

**Save these URLs - you'll need them next!**

---

## Step 2: Add Environment Variables to Backend (5 min)

### In Vercel Dashboard

1. Go to **codeflux-backend** project
2. Click **Settings** → **Environment Variables**
3. Add these 8 variables:

```
Name: VITE_GEMINI_API_KEY
Value: [Get from Google AI Studio]

Name: VITE_YOUTUBE_API_KEY
Value: AIzaSyBzgoVtLKh3ynOnH0o63ZMu5PMlkkfZSbI

Name: VITE_YOUTUBE_API_KEY_FALLBACK
Value: AIzaSyBzgoVtLKh3ynOnH0o63ZMu5PMlkkfZSbI

Name: VITE_QUIZ_GEMINI_API_KEY
Value: [Get from Google AI Studio]

Name: GOOGLE_CLIENT_ID
Value: [Get from Google Cloud - see below]

Name: GOOGLE_CLIENT_SECRET
Value: [Get from Google Cloud - see below]

Name: GOOGLE_CALLBACK_URL
Value: https://codeflux-backend.vercel.app/api/auth/google/callback

Name: NODE_ENV
Value: production
```

4. Click "Save"

⚠️ **IMPORTANT:** Don't have Google Client ID/Secret yet? Do Step 3 first, then come back here.

---

## Step 3: Get Google OAuth Credentials (10 min)

### Create OAuth 2.0 Credentials

1. Go to https://console.cloud.google.com
2. Make sure you're in the right project
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Choose **Web application**
6. Set Name: `CodeFlux Production`
7. Under **Authorized redirect URIs**, add:
   ```
   https://codeflux-backend.vercel.app/api/auth/google/callback
   https://codeflux.vercel.app
   ```
8. Click **Create**
9. Copy the **Client ID** and **Client Secret**

### Add to Vercel Backend Environment

1. Go back to Vercel
2. Go to **codeflux-backend** → **Settings** → **Environment Variables**
3. Add/Update:
   ```
   Name: GOOGLE_CLIENT_ID
   Value: [paste your Client ID]
   
   Name: GOOGLE_CLIENT_SECRET
   Value: [paste your Client Secret]
   ```
4. Click "Save"

### Redeploy Backend

1. In Vercel Dashboard, go to **codeflux-backend**
2. Click **Deployments**
3. Find the latest deployment
4. Click **...** → **Redeploy**
5. Wait for deployment to finish

---

## Step 4: Add Environment Variables to Frontend (5 min)

### In Vercel Dashboard

1. Go to **codeflux** (frontend) project
2. Click **Settings** → **Environment Variables**
3. Add these 11 variables:

```
Name: VITE_API_URL
Value: https://codeflux-backend.vercel.app/api

Name: VITE_FIREBASE_API_KEY
Value: AIzaSyDijo4LWfILX2FdmhAOe0dSvePMBbnMus8

Name: VITE_FIREBASE_AUTH_DOMAIN
Value: ai-learning-platform-4770d.firebaseapp.com

Name: VITE_FIREBASE_PROJECT_ID
Value: ai-learning-platform-4770d

Name: VITE_FIREBASE_STORAGE_BUCKET
Value: ai-learning-platform-4770d.appspot.com

Name: VITE_FIREBASE_MESSAGING_SENDER_ID
Value: 475093849889

Name: VITE_FIREBASE_APP_ID
Value: 1:475093849889:web:8b3f8c9d4e5f6a7b8c9d0e1f

Name: VITE_GEMINI_API_KEY
Value: AIzaSyAmkyo_IDM0i0yev0r0iTfRI6sZfTE-cro

Name: VITE_YOUTUBE_API_KEY
Value: AIzaSyBzgoVtLKh3ynOnH0o63ZMu5PMlkkfZSbI

Name: VITE_YOUTUBE_API_KEY_FALLBACK
Value: AIzaSyBzgoVtLKh3ynOnH0o63ZMu5PMlkkfZSbI

Name: VITE_QUIZ_GEMINI_API_KEY
Value: AIzaSyAmkyo_IDM0i0yev0r0iTfRI6sZfTE-cro
```

4. Click "Save"

### Redeploy Frontend

1. In Vercel Dashboard, go to **codeflux**
2. Click **Deployments**
3. Find the latest deployment
4. Click **...** → **Redeploy**
5. Wait for deployment to finish

---

## Step 5: Update Firebase OAuth Settings (5 min)

### In Firebase Console

1. Go to https://console.firebase.google.com
2. Select project: `ai-learning-platform-4770d`
3. Go to **Build** → **Authentication**
4. Click **Sign-in method** tab
5. Find **Google** provider
6. Under **Web SDK configuration**, update:
   - **Authorized domains**: Add `codeflux.vercel.app`
7. Click **Save**

### In Firebase OAuth Consent Screen

1. Go to **APIs & Services** → **OAuth consent screen**
2. Click **Edit App**
3. Go through the steps:
   - App name: `CodeFlux`
   - Support email: (your email)
   - Developer contact: (your email)
4. Under **Authorized domains**, add:
   ```
   codeflux.vercel.app
   codeflux-backend.vercel.app
   ```
5. Click **Save & Continue**
6. Skip scopes, click **Save & Continue**
7. Review and click **Back to Dashboard**

---

## Step 6: Test Everything (10 min)

### Visit Frontend URL

1. Open https://codeflux.vercel.app in browser
2. Wait for it to load (may take 10-30 seconds first time)
3. You should see the dashboard

### Test Google Sign-In

1. Click **Sign In** or **Get Started**
2. Click **Google** button
3. You should be redirected to Google login
4. Sign in with your Google account
5. You should be redirected back to app
6. You should see your profile

**If this fails**, check:
- Callback URL matches exactly
- OAuth credentials are correct
- Firebase settings updated
- Both services redeployed

### Test Creating a Course

1. Click **Create Course**
2. Enter a topic (e.g., "Machine Learning")
3. Click **Generate**
4. Wait 30-60 seconds
5. You should see a course with chapters

**If this fails**, check:
- Backend is deployed and online
- VITE_API_URL points to correct backend
- Gemini API key is valid
- CORS is configured (should be automatic)

### Test Videos

1. Open a chapter
2. Scroll down
3. You should see a YouTube video embedded
4. Click to play

**If this fails**, check:
- YouTube API key is valid
- API has search enabled
- Topic is specific enough (not too vague)

### Test on Mobile

1. On Android phone, visit: `https://codeflux.vercel.app`
2. Same tests as above
3. Test portrait and landscape modes
4. Buttons should be touch-friendly

---

## Step 7: Setup Monitoring (5 min)

### Monitor Backend

1. Go to **codeflux-backend** → **Logs**
2. Check for errors in real-time
3. Create alert:
   - Settings → **Alerts**
   - Add alert for errors

### Monitor Frontend

1. Go to **codeflux** → **Analytics**
2. Watch page load metrics
3. Monitor Core Web Vitals

### Monitor Firebase

1. Go to Firebase Console → **Monitoring**
2. Check Firestore usage
3. Watch authentication events

### Set Up Alerts (Optional)

**For API quota issues:**
1. Google Cloud Console → **Billing**
2. **Budget alerts**
3. Set alert at $50/month (or your limit)

---

## Step 8: Enable Auto-Deploy (2 min)

### Automatic Deployment on Git Push

1. In Vercel Dashboard → **codeflux-backend**
2. Go to **Settings** → **Git**
3. Make sure **Deploy on push** is enabled
4. Select branch: `main`

Repeat for **codeflux** (frontend)

**Now**: Every time you push to GitHub, Vercel automatically deploys! 🎉

---

## Step 9: Setup Custom Domain (Optional, 10 min)

### Add Custom Domain

1. In Vercel Dashboard → **codeflux**
2. Go to **Settings** → **Domains**
3. Enter your domain (e.g., `codeflux.com`)
4. Vercel shows DNS records to add
5. Go to your domain registrar (GoDaddy, NameCheap, etc.)
6. Add the DNS records
7. Wait 24-48 hours for propagation

### Update Production URLs

Once custom domain works, update:
1. Backend GOOGLE_CALLBACK_URL to use new domain
2. Firebase authorized domains
3. Google OAuth consent screen

---

## Step 10: Final Verification Checklist (5 min)

### ✅ Check Everything Works

```
[ ] Frontend loads at https://codeflux.vercel.app
[ ] Backend responds at https://codeflux-backend.vercel.app/api/health
[ ] Can sign in with Google
[ ] Can create a course
[ ] Can see YouTube videos
[ ] Quiz generates
[ ] Progress saves to Firebase
[ ] Mobile responsive works
[ ] No errors in browser console
[ ] No errors in Vercel logs
[ ] Page loads in < 3 seconds
```

---

## Common Issues & Solutions

### Issue: "Cannot GET /api/health"
**Solution:** Backend not deployed. Check Vercel backend project status.

### Issue: "Firebase offline error"
**Solution:** Firebase config values wrong. Compare with `.env.local` locally.

### Issue: "Google OAuth redirect failed"
**Solution:** Callback URL mismatch. Check in Google Cloud Console and Vercel env vars match exactly.

### Issue: "YouTube videos not found"
**Solution:** YouTube API quota exceeded or wrong topic. Try specific topic like "Python tutorial".

### Issue: "Page loads slowly"
**Solution:** Normal for first load. Vercel optimizes after 5-10 requests. Check network tab.

### Issue: "Quiz generates but has errors"
**Solution:** Gemini API quota. Check Google Cloud Console quota usage.

---

## Success Indicators

### ✅ You're Good If:

1. ✅ Frontend loads in < 3 seconds
2. ✅ Can sign in with Google account
3. ✅ Can create courses successfully
4. ✅ YouTube videos display in chapters
5. ✅ Quiz generates without errors
6. ✅ Progress saves and persists
7. ✅ No errors in browser console
8. ✅ No errors in Vercel logs
9. ✅ Mobile is responsive
10. ✅ All features work on mobile

---

## What's Next?

### Immediate (Today)
- ✅ Share app URL with team/users
- ✅ Collect initial feedback

### This Week
- ✅ Monitor for errors
- ✅ Check API quotas
- ✅ Respond to user feedback

### Next Week
- ✅ Analyze performance
- ✅ Plan optimizations
- ✅ Add requested features

### Next Month
- ✅ Setup analytics
- ✅ Plan next release
- ✅ Scale if needed

---

## Share Your App! 🎉

Now your app is live and configured. Share it:

```
✨ CodeFlux - AI Learning Platform
Create AI-generated courses with YouTube videos and AI quizzes
👉 https://codeflux.vercel.app
```

---

## Need Help?

### Check These Docs First
1. **DEPLOYMENT.md** → Troubleshooting section
2. **Vercel Logs** → See real errors
3. **Firebase Console** → Check database
4. **Google Cloud Console** → Check quotas

### Common Command

Check backend is running:
```bash
curl https://codeflux-backend.vercel.app/api/health
# Should return: {"status":"ok"}
```

---

**Congratulations! Your app is live!** 🚀

**Share the link:** https://codeflux.vercel.app
