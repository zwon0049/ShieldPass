# 🛡️ ShieldPass - Modern Subscription Protection Application

A beautiful, polished React + TypeScript frontend application that helps everyday consumers protect themselves from unwanted subscription charges.

## ✨ Features

### 🎯 Core Functionality
- **Create Self-Destructing Payment Passes** in under 60 seconds
- **Per-Charge Spending Limits** - Control maximum amount per individual transaction
- **Auto-Expiring Passes** - Set duration (1-90 days) for automatic expiration
- **Charge Limiting** - Define maximum number of charges allowed
- **Real-Time Tracking** - Monitor charge usage and remaining capacity
- **Charge History** - View detailed transaction history with status indicators

### 👥 User Management
- **Google Authentication** (mock/demo behavior)
- **Profile Customization** - Display name and avatar management
- **Settings Management** - Full user preferences and account settings
- **Persistent Authentication** - Session maintained via context

### 🎨 User Interface
- **Modern, Polished Design** - Professional fintech aesthetic
- **Dark/Light Mode** - Full theme support with system preference detection
- **Responsive Layout** - Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations** - Professional transitions and interactions
- **Accessible Components** - Semantic HTML and proper contrast ratios
- **Empty & Loading States** - Thoughtfully designed fallback states

### 📊 Dashboard Features
- **Statistics Overview** - Total, active, used, and expired passes at a glance
- **Pass Filtering** - Filter by status (All, Active, Used, Expired)
- **Visual Status Indicators** - Color-coded pass status badges
- **Progress Tracking** - Visual indicators for charge usage
- **Quick Actions** - Easy navigation and pass creation

### 📱 Pages

1. **Landing Page** (`LandingPage.tsx`)
   - Hero section with strong CTA
   - Problem statement section
   - "How It Works" explanation
   - Key concept highlighting (per-charge vs total limits)
   - Features & benefits section
   - Call-to-action footer

2. **Dashboard** (`DashboardPage.tsx`)
   - Overview statistics
   - Pass filtering system
   - Grid of all passes with visual cards
   - Quick pass management

3. **Create Pass** (`CreatePassPage.tsx`)
   - Step-by-step form with validation
   - Real-time summary panel
   - Clear distinction between per-charge and total limits
   - Helpful hints and error messages
   - Visual confirmation of settings

4. **Pass Details** (`PassDetailPage.tsx`)
   - Comprehensive pass information
   - Configuration details
   - Charge progress tracking
   - Full charge history with status indicators
   - Quick action buttons
   - Delete functionality

5. **Settings** (`SettingsPage.tsx`)
   - Profile management (name, email, avatar)
   - Theme selection (Light/Dark/System)
   - Account information
   - Logout functionality

## 🏗️ Project Structure

```
src/
├── App.tsx                          # Main app router and state management
├── main.tsx                         # Entry point with context providers
├── index.css                        # Tailwind CSS + custom styles
│
├── components/                      # Reusable UI components
│   ├── Badge.tsx                   # Status badges and labels
│   ├── Button.tsx                  # Customizable button component
│   ├── Card.tsx                    # Card layout components
│   ├── Dialog.tsx                  # Modals, toasts, and dialogs
│   ├── Form.tsx                    # Form inputs and controls
│   ├── Header.tsx                  # Navigation header
│   ├── PassCard.tsx                # Pass display card component
│   ├── ChargeHistory.tsx           # Charge history list
│   └── index.ts                    # Component exports
│
├── pages/                           # Page components
│   ├── LandingPage.tsx             # Hero/marketing page
│   ├── DashboardPage.tsx           # Pass overview and management
│   ├── CreatePassPage.tsx          # Pass creation form
│   ├── PassDetailPage.tsx          # Individual pass details
│   ├── SettingsPage.tsx            # User preferences
│   └── index.ts                    # Page exports
│
├── context/                         # React context providers
│   ├── ThemeContext.tsx            # Theme (light/dark) management
│   └── AuthContext.tsx             # Authentication and app state
│
├── types/                           # TypeScript type definitions
│   └── index.ts                    # Type declarations
│
└── data/                            # Mock data
    └── mockData.ts                 # Sample passes and user data
```

## 🎨 Design System

### Color Palette
- **Primary**: `#6366F1` (Indigo)
- **Success**: `#22C55E` (Green)
- **Warning**: `#EAB308` (Yellow)
- **Danger**: `#EF4444` (Red)

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 400, 500, 600, 700, 800

### Components
- **Rounded Corners**: 8px minimum (lg), 12px (xl)
- **Shadows**: Subtle for depth without overdoing
- **Spacing**: 4px grid system
- **Transitions**: 200ms duration

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation
```bash
cd shieldpass
npm install
```

### Development
```bash
npm run dev
```
Open http://localhost:5174 in your browser

### Build
```bash
npm run build
```

### Lint
```bash
npm run lint
```

## 📦 Dependencies

### Core
- `react` ^19.2.8 - UI framework
- `react-dom` ^19.2.8 - DOM rendering

### Styling
- `tailwindcss` ^4.3.3 - Utility-first CSS
- `@tailwindcss/vite` ^4.3.3 - Tailwind Vite plugin

### Icons
- `lucide-react` ^1.39.0 - Beautiful SVG icons

### Development
- `typescript` ~6.0.2 - Type safety
- `vite` ^8.2.2 - Build tool
- `eslint` ^10.9.0 - Code linting

## 🔑 Key Features Explained

### Per-Charge Limit Concept
The most important feature of ShieldPass is the **per-charge limit**, which is different from a total spending limit:

**Per-Charge Limit**: Maximum allowed for **each individual transaction**
- Example: $10 per charge × 3 charges = $30 maximum total
- Each transaction can't exceed $10
- Provides fine-grained control

**NOT Total Limit**: If you set $30 total limit, a single $40 charge could pass through

### Authentication
For this demo, authentication uses mock data:
- Default user: Sarah Johnson
- Email: sarah@example.com
- Login is simulated but fully functional

### State Management
- Uses React Context for global state
- `AuthContext` - User data, passes, authentication
- `ThemeContext` - Theme preference management
- All state is in-memory (resets on page reload)

### Routing
Simple client-side routing without external libraries:
- State-based page selection
- Smooth scroll on navigation
- Back button functionality

## 🎭 Mock Data

The application includes realistic sample data:
```typescript
- 5 sample passes
- Various statuses (Active, Used, Expired)
- Sample charge history with successful and blocked transactions
- Realistic merchant names and amounts
```

## 🌓 Dark Mode

Full dark mode support:
- Automatic detection of system preference
- Manual toggle in header
- Persistent user preference (localStorage)
- Smooth transitions between themes
- All components styled for both modes

## 📱 Responsive Design

Mobile-first responsive layout:
- Mobile menu with hamburger toggle
- Optimized touch targets (min 44px)
- Flexible grid layouts
- Readable text sizes (min 16px on mobile)
- Proper spacing and padding

## ✅ Best Practices Implemented

- **Type Safety** - Full TypeScript coverage
- **Component Reusability** - Modular component architecture
- **Accessibility** - Semantic HTML, ARIA labels
- **Performance** - Optimized re-renders, lazy loading ready
- **Code Organization** - Clear file structure and naming
- **Documentation** - Inline comments for complex logic
- **Error Handling** - Form validation, error states
- **UX** - Loading states, empty states, confirmations

## 🔄 State Flow

```
App Component (Router)
├── Theme Provider (Dark/Light mode)
│   └── Auth Provider (User & Passes)
│       ├── Page Components
│       │   ├── Landing Page
│       │   ├── Dashboard
│       │   ├── Create Pass
│       │   ├── Pass Details
│       │   └── Settings
│       └── Shared Components
│           ├── Header
│           ├── Cards
│           ├── Forms
│           └── Dialogs
```

## 🎯 User Workflows

### Creating a ShieldPass
1. Click "Create Your First Pass"
2. Enter per-charge limit (e.g., $10)
3. Choose expiry duration (1-90 days)
4. Set maximum number of charges (1-10)
5. Review summary panel
6. Click "Create ShieldPass"
7. Redirected to dashboard with new pass

### Viewing Pass Details
1. From dashboard, click any pass card
2. View full configuration details
3. Check charge progress and history
4. Copy pass ID or disable pass
5. View detailed charge history

### Managing Profile
1. Click profile menu in header
2. Go to Settings
3. Update display name
4. Change theme preference
5. View connected accounts
6. Logout when done

## 🚫 Frontend-Only Limitations

This is a frontend prototype without backend integration:
- No real payment processing
- No actual charge blocking
- No database persistence
- No real authentication (mock behavior)
- No email notifications
- No blockchain integration

These features would be added when connecting to a real backend API.

## 💡 Future Enhancements

- Backend API integration
- Real authentication (OAuth, JWT)
- Database for persistent storage
- Email notifications
- Push notifications
- Advanced analytics
- API key management
- Webhook support
- Multiple payment methods
- Merchant categorization
- Smart recommendations

## 📄 License

Created for hackathon demonstration purposes.

## 🤝 Contributing

This is a demo application. Feel free to fork and extend!

---

**ShieldPass** - Take control of your subscriptions. Protect yourself from unwanted charges. ✨
