# 🚀 Quick Start - View on Android Phone

## 60-Second Setup

### Step 1: Get Your Computer's IP (30 seconds)
Open **PowerShell** and run:
```powershell
ipconfig
```

Look for **IPv4 Address** (usually `192.168.x.x`)

**Example output:**
```
Ethernet adapter WiFi:
   IPv4 Address. . . . . . . . . : 192.168.1.100
```
👉 **Copy this IP address**

---

### Step 2: Start Backend (15 seconds)
Open **new PowerShell terminal** and run:
```powershell
cd 'c:\Users\Pushkar\codeflux clone\Code-flux-\server'
npm start
```

Wait for: `Server running on port 5000` ✅

---

### Step 3: Start Frontend (15 seconds)
Open **another PowerShell terminal** and run:
```powershell
cd 'c:\Users\Pushkar\codeflux clone\Code-flux-'
npm run dev
```

Wait for: `Local: http://localhost:5175` (note the port number) ✅

---

### Step 4: Open on Android Phone (≤1 minute)
1. Connect phone to **same WiFi** as your computer
2. Open browser (Chrome recommended)
3. Type in address bar:
   ```
   http://192.168.1.100:5175
   ```
   (Replace `192.168.1.100` with your IP from Step 1)
4. Press **Enter**

✅ **Done!** Your app is now on Android phone

---

## What to Test

✓ Dashboard loads  
✓ Scroll works smoothly  
✓ Tap buttons (all are ≥44x44px)  
✓ Create a course  
✓ View course chapters  
✓ Videos play full-screen  
✓ Rotate phone to landscape  
✓ Text is readable without zooming  

---

## Troubleshooting

### "Can't reach server" or "Connection refused"
```
✓ Verify backend is running (check terminal 2)
✓ Verify frontend is running (check terminal 3)
✓ Check both are on same WiFi
✓ Try different IP from ipconfig
✓ Disable phone WiFi + enable to refresh
```

### "Blank page"
```
✓ Hard refresh: Back button + refresh button
✓ Clear cache: Settings > Apps > [Browser] > Storage > Clear Data
✓ Try incognito/private mode
✓ Wait 5 seconds for page to load
```

### "Looks weird/wrong"
```
✓ Rotate phone back to portrait
✓ Hard refresh (hold back + tap refresh)
✓ Check if JavaScript is enabled in browser
```

---

## Features Optimized for Mobile

🎯 **Touch UI** - Minimum 44x44px buttons for easy tapping  
🎯 **Responsive** - Works on any screen size  
🎯 **Notch-safe** - Respects screen safe areas  
🎯 **Video player** - Full-screen responsive  
🎯 **Orientation** - Works landscape & portrait  
🎯 **Dark mode** - Auto-detects system theme  
🎯 **Fast** - Optimized for mobile networks  

---

## Still Having Issues?

Check the full guide: `docs/MOBILE_ACCESS_SETUP.md`

---

**Happy testing on mobile!** 📱
