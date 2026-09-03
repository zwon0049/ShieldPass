# ShieldPass - Quick Start Guide

## 🎯 Running the Application

### Start the Development Server
```bash
cd c:\Users\User\shieldpass
npm run dev
```

The application will be available at: **http://localhost:5174**

## 🧭 Navigation Guide

### Landing Page
When you first visit, you'll see:
- Hero section explaining the problem
- "Create Your First Pass" button
- Feature overview
- Important distinction between per-charge and total limits
- FAQ section
- Call-to-action buttons

**Actions:**
- Click "Create Your First Pass" → Goes to login/dashboard
- Scroll to learn about the product
- Click any CTA button to start

### Dashboard
Shows all your ShieldPasses with:
- Statistics cards (Total, Active, Used, Expired)
- Filter buttons to view passes by status
- Grid of pass cards
- "Create New Pass" button

**Actions:**
- Click filter tabs to filter passes
- Click any pass card to view details
- Click "Create New Pass" to create a new pass
- Click profile menu → Settings

### Create Pass Form
Three-step form to create a new ShieldPass:

1. **Per Charge Limit** ($)
   - Maximum amount allowed for each individual charge
   - Example: $10 means each transaction max is $10
   - ⚠️ NOT a total spending limit

2. **Expiry Duration** (days)
   - Options: 1, 7, 14, 30, 60, 90 days
   - Pass automatically expires after selected duration
   - No manual cancellation needed

3. **Maximum Charges**
   - Options: 1, 2, 3, 5, 10 charges
   - After this many charges, pass expires

**Summary Panel (Right):**
- Shows per-charge limit
- Shows maximum charges
- Calculates maximum possible total (limit × charges)
- Important warning about per-charge vs total

**Actions:**
- Fill out all three fields
- Watch summary update in real-time
- Click "Create ShieldPass" when ready
- Receive success message
- Redirected to dashboard

### Pass Details
Complete information about a single pass:

**Configuration Section:**
- Per charge limit (e.g., $10)
- Expiry date
- Visual status badge

**Charges Progress Section:**
- Used charges / Maximum charges
- Visual progress bar
- Breakdown cards (Used, Remaining, Max Possible)

**Charge History:**
- List of all transactions
- Shows merchant name and amount
- Green checkmark for successful charges
- Red X with reason for blocked charges

**Quick Actions:**
- Copy Pass ID button
- Disable Pass button (if active)
- Delete Pass button

**Status Card:**
- Quick overview of pass status
- Pass ID shown

### Settings Page
Manage your profile and preferences:

**Profile Settings:**
- Avatar/profile picture
- Display name
- Email (read-only, managed by Google)
- Upload/remove profile picture buttons

**Appearance:**
- Light mode
- Dark mode
- System mode (follows OS preference)
- Smooth transitions between themes

**Account:**
- Connected Google account display
- Logout button

## 🔄 Key User Flows

### Create and Use a Pass
1. Landing Page → "Create Your First Pass"
2. Auto-login with mock user (Sarah Johnson)
3. Dashboard loads with sample passes
4. Click "Create New Pass"
5. Fill form (e.g., $10/charge, 30 days, 3 charges)
6. See summary: "$10 × 3 = $30 maximum possible"
7. Click "Create ShieldPass"
8. Success message → Dashboard
9. See new pass in grid

### View Pass Details
1. From Dashboard
2. Click any pass card (not buttons)
3. See full configuration details
4. View charge history (if any charges exist)
5. Can copy ID or delete pass
6. Click back button to return to dashboard

### Change Theme
1. Click theme toggle button in header (sun/moon icon)
2. Or go to Settings → Appearance
3. Click desired theme
4. Theme changes immediately
5. Choice is saved to localStorage

### Logout
1. Click profile menu (top right)
2. Or go to Settings → Danger Zone
3. Click "Logout"
4. Return to Landing Page

## 💡 Important Concepts

### Per-Charge Limit
- **This:** Each individual charge is limited to $X
- **NOT This:** Total spending is limited to $X

**Example:**
- Settings: $10 per charge, max 3 charges
- Possible transactions:
  - ✅ $9.99, then $9.99, then $9.99 = $29.97 total
  - ✅ $10.00, $5.00, $8.00 = $23.00 total
  - ❌ $15.00 would be blocked (exceeds $10 per charge)

### Auto-Expiration
- Pass expires after selected duration automatically
- No manual action needed
- Can't be extended
- Create a new pass if needed again

### Charge Limits
- Pass stops working after max charges reached
- Combines with expiry duration for protection
- Prevents accidental repeated billing

## 🎨 Dark Mode

- Click sun/moon icon in header to toggle
- Three options: Light, Dark, System
- All components support dark mode
- Colors are optimized for both modes
- Your choice is remembered

## 🔒 Safety Features

The application demonstrates:
- Clear visual status indicators
- Confirmation dialogs for deletions
- Form validation with helpful errors
- Real-time calculations of limits
- Blocked charge indicators
- Detailed charge history

## ⚠️ Demo Limitations

This is a frontend prototype:
- ❌ No real payment processing
- ❌ No database (data resets on refresh)
- ❌ No backend API
- ❌ No real authentication
- ❌ No email notifications
- ✅ But fully functional for demonstration!

## 📝 Sample Data

The app comes pre-loaded with:
- User: Sarah Johnson (sarah@example.com)
- 5 sample passes in various states
- Sample charge history with successful/blocked transactions
- Realistic merchant names and amounts

## 🛠️ Troubleshooting

### Port Already in Use
```bash
# If port 5174 is busy, Vite will use the next available port
# Check terminal output for the correct URL
```

### Page Won't Load
- Make sure dev server is running: `npm run dev`
- Check browser console (F12) for errors
- Try clearing browser cache

### Theme Not Persisting
- localStorage might be disabled
- Try a different browser or private window

### Slow Performance
- Clear browser cache
- Close other tabs
- Restart dev server

## 📱 Mobile Testing

The app is fully responsive:
- Try resizing your browser window
- Mobile menu appears on small screens
- All buttons are touch-friendly
- Forms are optimized for mobile input

## 🎉 What to Try

1. **Create a Pass** - Go through the full flow
2. **View Details** - Click on created pass
3. **Toggle Theme** - Switch between dark/light
4. **Check Mobile** - Resize browser to mobile size
5. **Filter Passes** - Use dashboard filters
6. **Edit Profile** - Change name in settings
7. **View Charge History** - See sample charges (some blocked)
8. **Copy Pass ID** - Test clipboard functionality

## 📚 Project Files to Explore

Key files to understand the codebase:
- `src/App.tsx` - Main router
- `src/pages/LandingPage.tsx` - First impression
- `src/pages/CreatePassPage.tsx` - Complex form with validation
- `src/components/Card.tsx` - Reusable card component
- `src/context/AuthContext.tsx` - State management
- `src/data/mockData.ts` - Sample data

---

**Enjoy exploring ShieldPass!** 🛡️
