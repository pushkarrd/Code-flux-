# Vercel Deployment Guide

## Prerequisites
- Vercel account (https://vercel.com)
- GitHub repository connected to Vercel
- Environment variables ready

## Deployment Steps

### 1. Push Code to GitHub
```bash
git push origin codeflux
```

### 2. Connect to Vercel
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Select your GitHub repository `Code-flux-`
4. Choose branch: `codeflux`

### 3. Configure Environment Variables
In Vercel Dashboard, go to Project Settings → Environment Variables and add:

**Frontend Environment Variables:**
- `VITE_YOUTUBE_API_KEY` = `AIzaSyB-9-dGnbUC4BGsAT06hrnGevjVw3DO_JI`
- `VITE_GEMINI_API_KEY` = `AIzaSyAklz0C94qeRb3KuJ5Lmg3nV11ETlLYJ3c`
- `VITE_FIREBASE_API_KEY` = Your Firebase API Key
- `VITE_FIREBASE_AUTH_DOMAIN` = Your Firebase Auth Domain
- `VITE_FIREBASE_PROJECT_ID` = Your Firebase Project ID
- `VITE_FIREBASE_STORAGE_BUCKET` = Your Firebase Storage Bucket
- `VITE_FIREBASE_MESSAGING_SENDER_ID` = Your Firebase Messaging Sender ID
- `VITE_FIREBASE_APP_ID` = Your Firebase App ID
- `VITE_FIREBASE_DATABASE_URL` = Your Firebase Database URL
- `VITE_GOOGLE_CLIENT_ID` = Your Google OAuth Client ID

### 4. Deploy Settings
- **Build Command:** `npm run build`
- **Start Command:** `npm start`
- **Node Version:** 18.x

### 5. Deploy
Click "Deploy" button in Vercel Dashboard

## Project Structure
```
Code-flux-/
├── src/                 # React frontend (Vite)
├── server/              # Express backend (separate deployment)
├── package.json         # Frontend dependencies
├── vite.config.js       # Vite configuration
└── vercel.json          # Vercel configuration
```

## Important Notes

### Frontend (Vercel)
- Vite-based React application
- Runs on Vercel serverless platform
- Auto-deploys on push to `codeflux` branch

### Backend API (Separate)
The backend API (`server/` directory) needs to be deployed separately:

**Option 1: Deploy to Render.com**
1. Go to https://render.com
2. Create new Web Service
3. Connect your GitHub repo
4. Set build command: `npm install`
5. Set start command: `cd server && npm run start`
6. Add environment variables
7. Deploy

**Option 2: Deploy to Railway.app**
1. Go to https://railway.app
2. Create new project
3. Connect GitHub
4. Set build command: `npm install`
5. Set start command: `cd server && npm run start`
6. Deploy

**Option 3: Deploy to Heroku (Legacy)**
1. Create Procfile in root: `web: cd server && npm start`
2. Deploy using Heroku CLI

## Update Frontend API URL
After backend deployment, update the API URL in:
- `src/pages/ChapterDetail.jsx`
- `src/lib/videoSummaryService.js`
- Any other files calling `http://localhost:5000`

Change from:
```javascript
fetch('http://localhost:5000/api/youtube/search?topic=...')
```

To:
```javascript
fetch('https://your-backend-api.com/api/youtube/search?topic=...')
```

## Auto-Deployment
Once connected:
- Every push to `codeflux` branch automatically triggers deployment
- Build logs visible in Vercel Dashboard
- Preview URLs available for testing

## Testing Deployment
1. Visit your Vercel deployment URL
2. Sign in with Google
3. Test course creation, video loading, and quiz generation
4. Monitor error logs in Vercel Dashboard

## Troubleshooting

**Build fails:**
- Check Node version compatibility
- Ensure all dependencies are in package.json
- Check environment variables are set

**API calls fail:**
- Verify backend API URL is correct
- Check CORS settings on backend
- Ensure backend is running

**Missing videos/summaries:**
- Check API keys have quota remaining
- Verify Gemini API is enabled
- Check browser console for detailed errors
