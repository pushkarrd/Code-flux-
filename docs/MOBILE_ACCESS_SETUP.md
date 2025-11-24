# Mobile Access Setup - Android Phone

## How to Access CodeFlux on Your Android Phone

### Prerequisites
- Android phone on the same WiFi network as your development machine
- Terminal/PowerShell on your computer with both servers running
- Browser on Android phone (Chrome, Firefox, etc.)

### Step 1: Get Your Computer's IP Address

**On Windows PowerShell:**
```powershell
ipconfig
```

Look for "IPv4 Address" under your WiFi adapter (usually like `192.168.x.x` or `10.0.x.x`)

Example output:
```
Ethernet adapter Ethernet:
   IPv4 Address. . . . . . . . . : 192.168.1.100
```

### Step 2: Start Both Servers

**Terminal 1 - Backend (Port 5000):**
```powershell
cd 'c:\Users\Pushkar\codeflux clone\Code-flux-\server'
npm start
```

**Terminal 2 - Frontend (Port 5174 or 5175):**
```powershell
cd 'c:\Users\Pushkar\codeflux clone\Code-flux-'
npm run dev
```

Note the port number from the frontend output.

### Step 3: Access from Android Phone

1. Connect your Android phone to the same WiFi network
2. Open browser on phone (Chrome recommended)
3. Type the following in address bar:
```
http://192.168.x.x:5174
```
(Replace `192.168.x.x` with your actual IP and `5174` with the actual port if different)

### Troubleshooting

**"Connection refused" or "Can't reach server":**
- Verify both servers are running
- Check firewall isn't blocking ports 5000 and 5174
- Ensure phone is on same WiFi network
- Try disabling phone's mobile data (WiFi only)

**"Blank page" or "Looks wrong":**
- Hard refresh: Hold back button + tap refresh
- Clear browser cache: Settings > Apps > [Browser] > Storage > Clear Data
- Try in incognito/private mode

**Ports already in use:**
```powershell
# Kill all Node processes
Get-Process -Name node | Stop-Process -Force

# Then restart servers
```

## Environment Setup for Mobile Access

Update `.env.local` if needed:
```env
VITE_API_URL=http://[YOUR_IP]:5000/api
```

This is **not required** for local development as frontend auto-detects backend.

## Features Optimized for Mobile

✅ Responsive design (320px to 4K)  
✅ Touch-friendly buttons (min 44x44px)  
✅ Safe area support for notched devices  
✅ Full-width modals on mobile  
✅ Adaptive grid layouts  
✅ Landscape orientation support  
✅ Dark mode support  

## Performance Tips

- Close other browser tabs to free up memory
- Disable browser extensions if experiencing slowness
- Use Chrome for best performance
- Keep WiFi signal strong

## Mobile Testing Checklist

- [ ] Dashboard loads correctly
- [ ] Can scroll through courses
- [ ] Buttons are easily tappable
- [ ] Videos play in full screen
- [ ] Text is readable (no zoom needed)
- [ ] Create Course modal works
- [ ] Quiz feature responsive
- [ ] Study timer functional
- [ ] Progress displays correctly
- [ ] Firebase features work (auth, progress saving)
